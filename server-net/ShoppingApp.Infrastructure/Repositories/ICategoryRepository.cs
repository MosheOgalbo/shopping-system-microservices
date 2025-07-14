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

        // יוצר קטגוריה חדשה ומחזיר את האובייקט שנשמר כולל המזהה
        Task<Category> CreateAsync(Category category);

        // מעדכן קטגוריה קיימת ומחזיר את האובייקט המעודכן
        Task<Category> UpdateAsync(Category category);

        // מוחק קטגוריה לפי מזהה. מחזיר true אם המחיקה הצליחה, אחרת false
        Task<bool> DeleteAsync(int id);

        // בודק אם קיימת קטגוריה עם מזהה מסוים
        Task<bool> ExistsAsync(int id);

        // בודק אם קיימת קטגוריה עם שם מסוים, עם אפשרות לא לכלול ID ספציפי בבדיקה
        // שימושי למשל בעדכון שם, כדי לא להתנגש עם הקטגוריה הנוכחית
        Task<bool> CategoryNameExistsAsync(string name, int? excludeId = null);
    }
}
