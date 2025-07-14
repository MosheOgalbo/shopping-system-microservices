using Microsoft.EntityFrameworkCore;
using ShoppingApp.Core.Models;

namespace ShoppingApp.Infrastructure.Data
{
    // DbContext המרכז את ההגדרות של מסד הנתונים עבור האפליקציה
    public class ApplicationDbContext : DbContext
    {
        // בנאי שמקבל את ההגדרות ממערכת DI (Dependency Injection)
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        // טבלאות בסיס הנתונים – קבוצות ה-DbSet מייצגות טבלאות ב-DB
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }

        // הגדרת המודל והיחסים בין הישויות בבסיס הנתונים
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // קונפיגורציה של טבלת הקטגוריות
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.Id);                        // מפתח ראשי
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);    // שם חובה, עד 100 תווים
                entity.Property(e => e.Description).HasMaxLength(500);          // תיאור אופציונלי, עד 500 תווים
                entity.HasIndex(e => e.Name).IsUnique();                         // אינדקס ייחודי על השם (שם קטגוריה חייב להיות ייחודי)

                // הגדרה ספציפית ל-PostgreSQL - שימוש ב-Identity עבור יצירת מפתחות אוטומטיים
                entity.Property(e => e.Id).UseIdentityByDefaultColumn();
            });

            // קונפיגורציה של טבלת המוצרים
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.Id);                                   // מפתח ראשי
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);   // שם חובה, עד 200 תווים
                entity.Property(e => e.Description).HasMaxLength(1000);        // תיאור אופציונלי, עד 1000 תווים
                entity.Property(e => e.Image).HasMaxLength(500);               // כתובת תמונה, עד 500 תווים

                // הגדרת טיפוס הנתונים לעמודת המחיר (מספר עשרוני עם דיוק של 2 ספרות אחרי הנקודה)
                entity.Property(e => e.Price).HasColumnType("decimal(18,2)");

                entity.Property(e => e.Id).UseIdentityByDefaultColumn();       // מפתח אוטומטי עם Identity

                // הגדרת יחסי מפתח זר (Foreign Key)
                entity.HasOne(p => p.Category)                                 // מוצר שייך לקטגוריה אחת
                    .WithMany(c => c.Products)                                 // קטגוריה מכילה רשימת מוצרים
                    .HasForeignKey(p => p.CategoryId)                          // המפתח הזר הוא CategoryId בטבלת המוצרים
                    .OnDelete(DeleteBehavior.Cascade);                         // מחיקת קטגוריה תגרום למחיקת המוצרים הקשורים (Cascade)
            });

            // נתוני דמה (Seed data) לצורך אתחול בסיס הנתונים
            var now = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc);

            // יצירת קטגוריות לדוגמה
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "אלקטרוניקה", Description = "מוצרי אלקטרוניקה ומחשבים", CreatedAt = now },
                new Category { Id = 2, Name = "ביגוד", Description = "בגדים ואקססוריז", CreatedAt = now },
                new Category { Id = 3, Name = "ספרים", Description = "ספרים ומגזינים", CreatedAt = now }
            );

            // יצירת מוצרים לדוגמה
            modelBuilder.Entity<Product>().HasData(
                new Product {
                    Id = 1,
                    Name = "לפטופ Dell",
                    Description = "מחשב נייד מתקדם",
                    Price = 2999.99m,
                    CategoryId = 1,
                    Image = "https://example.com/images/dell-laptop.jpg",
                    CreatedAt = now
                },
                new Product {
                    Id = 2,
                    Name = "חולצה כחולה",
                    Description = "חולצת כותנה איכותית",
                    Price = 89.99m,
                    CategoryId = 2,
                    Image = "https://example.com/images/blue-shirt.jpg",
                    CreatedAt = now
                },
                new Product {
                    Id = 3,
                    Name = "ספר תכנות",
                    Description = "ספר ללימוד תכנות",
                    Price = 149.99m,
                    CategoryId = 3,
                    Image = "https://example.com/images/programming-book.jpg",
                    CreatedAt = now
                }
            );
        }
    }
}
