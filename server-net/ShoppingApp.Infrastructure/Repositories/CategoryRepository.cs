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

        // מוסיף קטגוריה חדשה למסד הנתונים ושומר שינויים
        public async Task<Category> CreateAsync(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return category;
        }

        // מעדכן קטגוריה קיימת ושומר את השינויים במסד הנתונים
        public async Task<Category> UpdateAsync(Category category)
        {
            _context.Entry(category).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return category;
        }

        // מוחק קטגוריה לפי מזהה; מחזיר true אם המחיקה הצליחה, אחרת false
        public async Task<bool> DeleteAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return false;

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return true;
        }

        // בודק האם קיימת קטגוריה עם מזהה מסוים
        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Categories.AnyAsync(c => c.Id == id);
        }

        // בודק אם שם קטגוריה קיים, עם אפשרות לא לכלול קטגוריה מסוימת לפי מזהה (למשל בעדכון שם)
        public async Task<bool> CategoryNameExistsAsync(string name, int? excludeId = null)
        {
            return await _context.Categories
                .AnyAsync(c => c.Name.ToLower() == name.ToLower() &&
                              (excludeId == null || c.Id != excludeId));
        }
    }
}
