using System.ComponentModel.DataAnnotations;

namespace ShoppingApp.Core.Models
{
    public class Category
    {
        public int Id { get; set; }

        // שם הקטגוריה - חובה, עד 100 תווים
        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        // תיאור הקטגוריה - אופציונלי, עד 500 תווים
        [StringLength(500)]
        public string? Description { get; set; }

        // תאריך יצירת הקטגוריה - ברירת מחדל: התאריך הנוכחי בעת יצירת האובייקט
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


        public virtual ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
