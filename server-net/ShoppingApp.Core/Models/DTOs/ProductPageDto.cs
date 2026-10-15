namespace ShoppingApp.Core.Models.DTOs
{
    public class ProductPageDto
    {
        public IReadOnlyList<ProductDto> Items { get; set; } = [];
        public int Total { get; set; }
        public int Skip { get; set; }
        public int Take { get; set; }
    }
}
