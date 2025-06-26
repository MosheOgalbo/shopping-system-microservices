using System.ComponentModel.DataAnnotations;

namespace ShoppingApp.Core.Models.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateProductDto
    {
        [Required]
        [StringLength(200)]
        public string Name { get; set; }

        [StringLength(1000)]
        public string? Description { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "המחיר חייב להיות גדול מאפס")]
        public decimal Price { get; set; }

        [Required]
        public int CategoryId { get; set; }
    }

    public class UpdateProductDto
    {
        [Required]
        [StringLength(200)]
        public string Name { get; set; }

        [StringLength(1000)]
        public string? Description { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "המחיר חייב להיות גדול מאפס")]
        public decimal Price { get; set; }

        [Required]
        public int CategoryId { get; set; }
    }
}
