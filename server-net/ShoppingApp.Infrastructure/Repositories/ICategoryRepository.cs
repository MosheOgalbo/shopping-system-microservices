using ShoppingApp.Core.Models;

namespace ShoppingApp.Infrastructure.Repositories
{
    // ממשק המגדיר פעולות נדרשות לניהול קטגוריות במסד הנתונים
    // מייצג את שכבת הגישה לנתונים עבור Category
    public interface ICategoryRepository
    {
        // מחזיר את כל רשימת הקטגוריות במסד הנתונים בצורה אסינכרונית
        Task<IEnumerable<Category>> GetAllAsync();

        // מחפש ומחזיר קטגוריה לפי מזהה ייחודי (ID)
        // מחזיר null אם לא נמצאה קטגוריה מתאימה
        Task<Category?> GetByIdAsync(int id);

        // מחפש ומחזיר קטגוריה לפי שם (ייחודי)
        // שימושי לשליפה לפי שם במקום לפי ID
        Task<Category?> GetByNameAsync(string name);

        // בודק אם קיימת קטגוריה עם מזהה מסוים
        Task<bool> ExistsAsync(int id);
    }
}
