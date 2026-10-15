using Microsoft.EntityFrameworkCore;
using ShoppingApp.Infrastructure.Data;
using ShoppingApp.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' is not configured.");

builder.Services.AddProblemDetails();
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new()
    {
        Title = "Shopping App API",
        Version = "v1",
        Description = "Read-only API for categories and products"
    });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString, sql =>
    {
        sql.MigrationsAssembly("ShoppingApp.Infrastructure");
        sql.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
    })
);

builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();

var configuredOrigins = builder.Configuration["Cors:AllowedOrigins"]
    ?.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
    ?? Array.Empty<string>();

var defaultOrigins = new[]
{
    "http://localhost:3000",
    "https://localhost:3000",
    "http://localhost:5173",
    "https://localhost:5173"
};

var allowedOrigins = configuredOrigins.Length > 0
    ? configuredOrigins
    : defaultOrigins;

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        if (allowedOrigins.Length == 1 && allowedOrigins[0] == "*")
        {
            policy.AllowAnyOrigin()
                .AllowAnyHeader()
                .WithMethods(HttpMethods.Get, HttpMethods.Options);
            return;
        }

        policy.WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .WithMethods(HttpMethods.Get, HttpMethods.Options)
            .AllowCredentials();
    });
});

builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

var app = builder.Build();

app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Shopping App API V1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseCors("AllowFrontend");
app.UseAuthorization();
app.MapControllers();
app.MapGet("/health", async (ApplicationDbContext db, CancellationToken cancellationToken) =>
{
    var canConnect = await db.Database.CanConnectAsync(cancellationToken);
    return canConnect
        ? Results.Ok(new { status = "ok" })
        : Results.Json(new { status = "unavailable" }, statusCode: StatusCodes.Status503ServiceUnavailable);
});

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILoggerFactory>().CreateLogger("Database");

    try
    {
        if (app.Environment.IsEnvironment("Testing"))
        {
            await dbContext.Database.EnsureCreatedAsync();
        }
        else
        {
            logger.LogInformation("Applying database migrations");
            await dbContext.Database.MigrateAsync();
            logger.LogInformation("Database migrations complete");
        }
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Database initialization failed");
        throw;
    }
}

app.Run();

public partial class Program { }
