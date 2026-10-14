using ShoppingApp.Core.Models;

namespace ShoppingApp.Core.Models.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public string? Image { get; set; }
        public DateTime CreatedAt { get; set; }

        public static ProductDto FromEntity(Product product) => new()
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            CategoryId = product.CategoryId,
            CategoryName = product.Category.Name,
            Image = product.Image,
            CreatedAt = product.CreatedAt
        };
    }
}
