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

// ======================
// קריאת מחרוזת חיבור
// ======================
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
Console.WriteLine($"Using DefaultConnection = '{connectionString}'");

// ======================
// רישום שירותים (DI)
// ======================

// מוסיף Controllers ומגדיר אופציות סידור ל-JSON
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // מונע לולאות אינסופיות בסידור JSON (במקרה של גרפים מקושרים)
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        // שומר שמות מאפיינים מקוריים (לא משנה ל-camelCase)
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });

// מוסיף Swagger ליצירת דוקומנטציה אוטומטית ל-API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new()
    {
        Title = "Shopping App API",
        Version = "v1",
        Description = "API for managing categories and products"
    });

    // הוספת הערות XML (אם קיימות), לדוקומנטציה עשירה יותר
    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
    {
        c.IncludeXmlComments(xmlPath);
    }
});

// מגדיר את Kestrel שיאזין על כל הכתובות (טוב לדוקר או הפעלה מרוחקת)
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(8080);
});

// מוסיף EF Core עם PostgreSQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString, npgsql =>
        npgsql.MigrationsAssembly("ShoppingApp.Infrastructure")
    )
);

// רישום ריפוזיטוריז ל-DI
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();

// הגדרת CORS — כדי לאפשר חיבור מה-Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        // מומלץ בעתיד להזיז את הכתובות לקובץ הגדרות
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

// הגדרת לוגינג
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

var app = builder.Build();

// ======================
// הגדרת ה-Pipeline
// ======================

// רק בסביבת Development — הצגת Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Shopping App API V1");
        c.RoutePrefix = string.Empty; // פותח את ה-UI בשורש
    });
}

// אם רוצים להעביר את כל התעבורה ל-HTTPS
// app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthorization();
app.MapControllers();

// ======================
// הפעלת Migrations על ה-DB בזמן Startup
// ======================
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
