using Microsoft.EntityFrameworkCore;
using ShoppingApp.Infrastructure.Data;
using ShoppingApp.Infrastructure.Repositories;
using System.Text.Json.Serialization;


var builder = WebApplication.CreateBuilder(args);

// Debug: Connection String
var conn = builder.Configuration.GetConnectionString("DefaultConnection");
Console.WriteLine($">>> Using DefaultConnection = '{conn}'");


// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // מניעת infinite loop בserialization
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        // הצגת property names כפי שהם מוגדרים (לא camelCase)
        options.JsonSerializerOptions.PropertyNamingPolicy = null;

    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() {
        Title = "Shopping App API",
        Version = "v1",
        Description = "API למערכת ניהול קטגוריות ומוצרים"
    });

    // הוספת תיאורים מתוך XML comments
    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
    {
        c.IncludeXmlComments(xmlPath);
    }
});

// Database Configuration
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(conn, sqlOptions =>
        sqlOptions.MigrationsAssembly("ShoppingApp.Infrastructure")
    ));

// Repository Registration
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();

// CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Logging Configuration
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Shopping App API V1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

// Database Initialization
// Database Initialization
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    try
    {        // מוודא שהמבנה של המיגרציות מוחל

         var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
         Console.WriteLine(">>> Migrating database...");
         db.Database.Migrate();
          Console.WriteLine(">>> Migration complete.");

    }
    catch (Exception ex)
    {
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while migrating the database");
        throw; // זורק שוב כדי שתראה את השגיאה במסוף
    }
}


app.Run();
