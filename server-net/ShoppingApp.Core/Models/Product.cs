using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShoppingApp.Core.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; }

        [StringLength(1000)]
        public string? Description { get; set; }

        // מחיר המוצר - חובה, עם פורמט מדויק בבסיס הנתונים (decimal 18,2)
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        // מזהה הקטגוריה - חובה
        [Required]
        public int CategoryId { get; set; }

        // כתובת תמונה - אופציונלי, עד 500 תווים
        [StringLength(500)]
        public string? Image { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public virtual Category Category { get; set; }
    }
}
