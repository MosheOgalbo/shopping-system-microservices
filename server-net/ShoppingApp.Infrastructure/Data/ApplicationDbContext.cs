using Microsoft.EntityFrameworkCore;
using ShoppingApp.Core.Models;

namespace ShoppingApp.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.HasIndex(e => e.Name).IsUnique();
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(1000);
                entity.Property(e => e.Image).HasMaxLength(500);
                entity.Property(e => e.Price).HasColumnType("decimal(18,2)");

                entity.HasOne(p => p.Category)
                    .WithMany(c => c.Products)
                    .HasForeignKey(p => p.CategoryId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            var now = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc);

            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "אלקטרוניקה", Description = "מוצרי אלקטרוניקה ומחשבים", CreatedAt = now },
                new Category { Id = 2, Name = "ביגוד", Description = "בגדים ואקססוריז", CreatedAt = now },
                new Category { Id = 3, Name = "ספרים", Description = "ספרים ומגזינים", CreatedAt = now }
            );

            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    Id = 1,
                    Name = "לפטופ Dell",
                    Description = "מחשב נייד לעבודה וללימודים",
                    Price = 2999.99m,
                    CategoryId = 1,
                    Image = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
                    CreatedAt = now
                },
                new Product
                {
                    Id = 2,
                    Name = "אוזניות אלחוטיות",
                    Description = "אוזניות עם ביטול רעשים",
                    Price = 349.00m,
                    CategoryId = 1,
                    Image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
                    CreatedAt = now
                },
                new Product
                {
                    Id = 3,
                    Name = "חולצה כחולה",
                    Description = "חולצת כותנה איכותית",
                    Price = 89.99m,
                    CategoryId = 2,
                    Image = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
                    CreatedAt = now
                },
                new Product
                {
                    Id = 4,
                    Name = "ז'קט קלאסי",
                    Description = "ז'קט קל לעונת המעבר",
                    Price = 249.00m,
                    CategoryId = 2,
                    Image = "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
                    CreatedAt = now
                },
                new Product
                {
                    Id = 5,
                    Name = "ספר תכנות",
                    Description = "ספר ללימוד תכנות מעשי",
                    Price = 149.99m,
                    CategoryId = 3,
                    Image = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80",
                    CreatedAt = now
                },
                new Product
                {
                    Id = 6,
                    Name = "מארז ספרים",
                    Description = "שלושה ספרים נבחרים",
                    Price = 119.00m,
                    CategoryId = 3,
                    Image = "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
                    CreatedAt = now
                }
            );
        }
    }
}
