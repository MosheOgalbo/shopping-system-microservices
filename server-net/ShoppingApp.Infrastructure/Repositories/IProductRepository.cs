using ShoppingApp.Core.Models;

namespace ShoppingApp.Infrastructure.Repositories
{
    // ממשק זה מגדיר את הפעולות הבסיסיות לטיפול באובייקט Product במסד הנתונים
    // תפקידו להוות חוזה שעליו יתבסס מימוש ה-Repository, כך שניתן להחליף בקלות מימושים מבלי לשנות את שאר הקוד
    public interface IProductRepository
    {
        // מחזיר את כל רשימת המוצרים במסד הנתונים בצורה אסינכרונית
        Task<IEnumerable<Product>> GetAllAsync();

        // מחפש ומחזיר מוצר לפי מזהה ייחודי (ID)
        // מחזיר null אם לא נמצא מוצר מתאים
        Task<Product?> GetByIdAsync(int id);

        // מחזיר את כל המוצרים ששייכים לקטגוריה מסוימת (לפי CategoryId)
        Task<IEnumerable<Product>> GetByCategoryIdAsync(int categoryId);

        // יוצר מוצר חדש ומחזיר את האובייקט שנשמר (כולל מזהה ונתונים מעודכנים)
        Task<Product> CreateAsync(Product product);

        // מעדכן מוצר קיים ומחזיר את האובייקט המעודכן
        Task<Product> UpdateAsync(Product product);

        // מוחק מוצר לפי מזהה. מחזיר אמת אם המחיקה הצליחה, אחרת שקר
        Task<bool> DeleteAsync(int id);

        // בודק אם מוצר עם מזהה מסוים קיים במסד הנתונים
        Task<bool> ExistsAsync(int id);
    }
}
