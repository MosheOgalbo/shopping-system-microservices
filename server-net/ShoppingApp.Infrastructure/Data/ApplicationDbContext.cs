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

            // Category configuration
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.HasIndex(e => e.Name).IsUnique();

                // PostgreSQL specific: Using SERIAL for auto increment
                entity.Property(e => e.Id).UseIdentityByDefaultColumn();
            });

            // Product configuration
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(1000);
                entity.Property(e => e.Image).HasMaxLength(500);  // ** חדש **

                // Using the right type for the money
                entity.Property(e => e.Price).HasColumnType("decimal(18,2)");
                entity.Property(e => e.Id).UseIdentityByDefaultColumn();

                // Foreign key relationship
                entity.HasOne(p => p.Category)
                .WithMany(c => c.Products)
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);
            });

            // Seed data
            var now = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc);

            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "אלקטרוניקה", Description = "מוצרי אלקטרוניקה ומחשבים", CreatedAt = now },
                new Category { Id = 2, Name = "ביגוד", Description = "בגדים ואקססוריז", CreatedAt = now },
                new Category { Id = 3, Name = "ספרים", Description = "ספרים ומגזינים", CreatedAt = now }
            );

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
