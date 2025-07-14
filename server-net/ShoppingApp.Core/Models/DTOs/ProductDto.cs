using System.ComponentModel.DataAnnotations;

namespace ShoppingApp.Core.Models.DTOs
{
    // DTO להצגת מוצר ללקוח (Response)
    public class ProductDto
    {
        public int Id { get; set; }
        // שם המוצר
        public string Name { get; set; }
        // תיאור המוצר (אופציונלי)
        public string? Description { get; set; }
        // מחיר המוצר
        public decimal Price { get; set; }
        // מזהה הקטגוריה שאליה שייך המוצר
        public int CategoryId { get; set; }
        // שם הקטגוריה (מוכן לתצוגה, ללא צורך בלקוח לשלוף בעצמו)
        public string CategoryName { get; set; }
        // כתובת התמונה של המוצר (אופציונלי)
        public string? Image { get; set; }
        // תאריך יצירת המוצר
        public DateTime CreatedAt { get; set; }
    }

    // DTO ליצירת מוצר חדש (Request)
    public class CreateProductDto
    {
        // שם המוצר - חובה, עד 200 תווים
        [Required]
        [StringLength(200)]
        public string Name { get; set; }

        // תיאור המוצר - אופציונלי, עד 1000 תווים
        [StringLength(1000)]
        public string? Description { get; set; }

        // מחיר המוצר - חובה, חייב להיות גדול מ-0
        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "המחיר חייב להיות גדול מאפס")]
        public decimal Price { get; set; }

        // מזהה הקטגוריה - חובה
        [Required]
        public int CategoryId { get; set; }

        // כתובת התמונה - אופציונלי, עד 500 תווים, חייב להיות URL תקין אם קיים
        [StringLength(500, ErrorMessage = "URL התמונה ארוך מדי")]
        [Url(ErrorMessage = "יש להזין URL תקין")]
        public string? Image { get; set; }
    }

    // DTO לעדכון מוצר קיים (Request)
    public class UpdateProductDto
    {
        [Required]
        [StringLength(200)]
        public string Name { get; set; }

        // תיאור המוצר - אופציונלי, עד 1000 תווים
        [StringLength(1000)]
        public string? Description { get; set; }

        // מחיר המוצר - חובה, חייב להיות גדול מ-0
        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "המחיר חייב להיות גדול מאפס")]
        public decimal Price { get; set; }

        // מזהה הקטגוריה - חובה
        [Required]
        public int CategoryId { get; set; }

        // כתובת התמונה - אופציונלי, עד 500 תווים, חייב להיות URL תקין אם קיים
        [StringLength(500, ErrorMessage = "URL התמונה ארוך מדי")]
        [Url(ErrorMessage = "יש להזין URL תקין")]
        public string? Image { get; set; }
    }
}
