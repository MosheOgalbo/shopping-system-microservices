using Microsoft.EntityFrameworkCore;
using ShoppingApp.Core.Models;
using ShoppingApp.Infrastructure.Data;

namespace ShoppingApp.Infrastructure.Repositories
{
    // מימוש ממשק IProductRepository לטיפול במוצרי החנות
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;  // DbContext של Entity Framework Core

        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;  // קבלת תלויות (DI) של DbContext דרך הקונסטרקטור
        }

        // מחזיר את כל המוצרים כולל המידע על הקטגוריה, ממוין לפי שם המוצר
        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await _context.Products
                .Include(p => p.Category)   // טעינת נתוני הקטגוריה של כל מוצר (eager loading)
                .OrderBy(p => p.Name)
                .ToListAsync();
        }

        // מחזיר מוצר לפי מזהה, או null אם לא נמצא, כולל קטגוריה
        public async Task<Product?> GetByIdAsync(int id)
        {
            return await _context.Products
                .Include(p => p.Category)  // חשוב לטעון גם את הקטגוריה לשם הצגה או עיבוד
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        // מחזיר רשימת מוצרים לפי מזהה קטגוריה, כולל קטגוריה וממויינים לפי שם מוצר
        public async Task<IEnumerable<Product>> GetByCategoryIdAsync(int categoryId)
        {
            return await _context.Products
                .Include(p => p.Category)
                .Where(p => p.CategoryId == categoryId)
                .OrderBy(p => p.Name)
                .ToListAsync();
        }

        // יצירת מוצר חדש במסד הנתונים
        public async Task<Product> CreateAsync(Product product)
        {
            _context.Products.Add(product);    // הוספה לקונטקסט
            await _context.SaveChangesAsync(); // שמירה במסד הנתונים

            // טעינת הקטגוריה אחרי הוספה עבור החזרת התוצר המלא
            await _context.Entry(product)
                .Reference(p => p.Category)
                .LoadAsync();

            return product;
        }

        // עדכון מוצר קיים
        public async Task<Product> UpdateAsync(Product product)
        {
            _context.Entry(product).State = EntityState.Modified; // סימון האובייקט לעדכון
            await _context.SaveChangesAsync();

            // טעינת הקטגוריה לאחר העדכון לחזרה מלאה
            await _context.Entry(product)
                .Reference(p => p.Category)
                .LoadAsync();

            return product;
        }

        // מחיקת מוצר לפי ID. מחזיר true אם המחיקה בוצעה, false אם לא נמצא מוצר
        public async Task<bool> DeleteAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return false;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }

        // בדיקה אם מוצר עם מזהה מסוים קיים במסד הנתונים
        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Products.AnyAsync(p => p.Id == id);
        }
    }
}
