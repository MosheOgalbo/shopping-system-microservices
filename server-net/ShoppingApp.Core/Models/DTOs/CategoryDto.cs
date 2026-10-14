using ShoppingApp.Core.Models;

namespace ShoppingApp.Core.Models.DTOs
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public int ProductCount { get; set; }

        public static CategoryDto FromEntity(Category category) => new()
        {
            Id = category.Id,
            Name = category.Name,
            Description = category.Description,
            CreatedAt = category.CreatedAt,
            ProductCount = category.Products.Count
        };
    }
}
