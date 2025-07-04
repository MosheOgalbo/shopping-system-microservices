using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ShoppingApp.Infrastructure.Data;
using ShoppingApp.Infrastructure.Repositories;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Retrieve the connection string from configuration
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
Console.WriteLine($"Using DefaultConnection = '{connectionString}'");

// ===== Add Services =====
// Configure MVC controllers and JSON serialization options
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Prevent infinite loops in object graphs during JSON serialization
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;

        // Preserve original property names (disable camel-casing)
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });

// Register Swagger/OpenAPI generator with XML comments support
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new()
    {
        Title = "Shopping App API",
        Version = "v1",
        Description = "API for managing categories and products"
    });

    // Include XML comments if available for richer API documentation
    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
    {
        c.IncludeXmlComments(xmlPath);
    }
});

// Configure Kestrel to listen on all network interfaces (container port)
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(8080);
});

// Configure EF Core to use PostgreSQL and specify migrations assembly
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString, npgsql =>
        npgsql.MigrationsAssembly("ShoppingApp.Infrastructure")
    )
);

// Register repository implementations for dependency injection
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();

// Configure CORS to allow front-end applications
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        // Consider moving origins to configuration for flexibility
        policy.WithOrigins(
            "http://localhost:3000",
            "https://localhost:3000",
            "http://localhost:5173",
            "https://localhost:5173"
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

// Clear default logging providers and add console/debug logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

var app = builder.Build();

// ===== Configure HTTP Request Pipeline =====
if (app.Environment.IsDevelopment())
{
    // Enable Swagger in development environment
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Shopping App API V1");
        c.RoutePrefix = string.Empty; // Serve UI at app root
    });
}

// Uncomment to enforce HTTPS
// app.UseHttpsRedirection();

app.UseCors("AllowFrontend");
app.UseAuthorization();
app.MapControllers();

// ===== Database Migration on Startup =====
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

    try
    {
        Console.WriteLine("Migrating database...");
        dbContext.Database.Migrate();
        Console.WriteLine("Database migration complete.");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Error occurred during database migration");
        throw;
    }
}

app.Run();
