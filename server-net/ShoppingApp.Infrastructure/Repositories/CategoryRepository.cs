using Microsoft.EntityFrameworkCore;
using ShoppingApp.Core.Models;
using ShoppingApp.Infrastructure.Data;

namespace ShoppingApp.Infrastructure.Repositories
{
    // מימוש ממשק ICategoryRepository שמבצע גישה לנתונים (Data Access Layer) עבור קטגוריות
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _context;

        // קונסטרקטור שמקבל את ה-DbContext של אפליקציית ה-Entity Framework
        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // מחזיר את כל הקטגוריות עם המוצרים המקושרים לכל קטגוריה, ממוין לפי שם
        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _context.Categories
                .Include(c => c.Products)  // טוען את רשימת המוצרים המקושרים (Eager Loading)
                .OrderBy(c => c.Name)
                .ToListAsync();
        }

        // מחזיר קטגוריה לפי מזהה, כולל טוען את המוצרים המקושרים
        public async Task<Category?> GetByIdAsync(int id)
        {
            return await _context.Categories
                .Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        // מחזיר קטגוריה לפי שם (חיפוש לא תלוי אותיות גדולות/קטנות)
        public async Task<Category?> GetByNameAsync(string name)
        {
            return await _context.Categories
                .Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.Name.ToLower() == name.ToLower());
        }

        // בודק האם קיימת קטגוריה עם מזהה מסוים
        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Categories.AnyAsync(c => c.Id == id);
        }
    }
}
