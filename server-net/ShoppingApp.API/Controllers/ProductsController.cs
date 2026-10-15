using Microsoft.AspNetCore.Mvc;
using ShoppingApp.Core.Models.DTOs;
using ShoppingApp.Infrastructure.Repositories;

namespace ShoppingApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly ICategoryRepository _categoryRepository;

        public ProductsController(
            IProductRepository productRepository,
            ICategoryRepository categoryRepository)
        {
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
        }

        /// <summary>
        /// מחזיר מוצרים. אופציונלי: ?ids=1,2,3
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts([FromQuery] string? ids)
        {
            if (string.IsNullOrWhiteSpace(ids))
            {
                var products = await _productRepository.GetAllAsync();
                return Ok(products.Select(ProductDto.FromEntity));
            }

            var parsedIds = ParseIds(ids);
            var matched = await _productRepository.GetByIdsAsync(parsedIds);
            return Ok(matched.Select(ProductDto.FromEntity));
        }

        /// <summary>
        /// מחזיר מוצר לפי ID
        /// </summary>
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound($"מוצר עם ID {id} לא נמצא");
            }

            return Ok(ProductDto.FromEntity(product));
        }

        /// <summary>
        /// מחזיר מוצרים לפי ID קטגוריה
        /// </summary>
        [HttpGet("category/{categoryId:int}")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsByCategory(int categoryId)
        {
            if (!await _categoryRepository.ExistsAsync(categoryId))
            {
                return NotFound($"קטגוריה עם ID {categoryId} לא נמצאה");
            }

            var products = await _productRepository.GetByCategoryIdAsync(categoryId);
            return Ok(products.Select(ProductDto.FromEntity));
        }

        private static IReadOnlyCollection<int> ParseIds(string ids) =>
            ids.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                .Select(value => int.TryParse(value, out var id) ? id : (int?)null)
                .Where(id => id.HasValue)
                .Select(id => id!.Value)
                .Distinct()
                .ToArray();
    }
}
