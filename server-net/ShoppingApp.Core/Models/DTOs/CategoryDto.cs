using System.ComponentModel.DataAnnotations;

namespace ShoppingApp.Core.Models.DTOs
{
    // DTO להצגת קטגוריה (Response ללקוח)
    public class CategoryDto
    {
        // מזהה ייחודי של הקטגוריה
        public int Id { get; set; }

        // שם הקטגוריה
        public string Name { get; set; }

        // תיאור הקטגוריה (אופציונלי)
        public string? Description { get; set; }

        // תאריך יצירת הקטגוריה
        public DateTime CreatedAt { get; set; }

        // מספר המוצרים שמשויכים לקטגוריה זו
        public int ProductCount { get; set; }
    }

    // DTO ליצירת קטגוריה חדשה (Request מהלקוח)
    public class CreateCategoryDto
    {
        // שם הקטגוריה - שדה חובה, מקסימום 100 תווים
        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        // תיאור הקטגוריה - אופציונלי, מקסימום 500 תווים
        [StringLength(500)]
        public string? Description { get; set; }
    }

    // DTO לעדכון קטגוריה קיימת (Request מהלקוח)
    public class UpdateCategoryDto
    {
        // שם הקטגוריה - שדה חובה, מקסימום 100 תווים
        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        // תיאור הקטגוריה - אופציונלי, מקסימום 500 תווים
        [StringLength(500)]
        public string? Description { get; set; }
    }
}
