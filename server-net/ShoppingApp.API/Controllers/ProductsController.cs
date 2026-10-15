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
        /// מחזיר מוצרים.
        /// ?ids=1,2,3 נשאר מערך JSON.
        /// ?q= מחזיר את כל ההתאמות.
        /// ?skip=&amp;take= מחזיר עמוד.
        /// בלי פרמטרים נשאר המערך המלא.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetProducts(
            [FromQuery] string? ids,
            [FromQuery] int? skip,
            [FromQuery] int? take,
            [FromQuery] string? q,
            [FromQuery] string? sort)
        {
            if (!string.IsNullOrWhiteSpace(ids))
            {
                var parsedIds = ParseIds(ids);
                var matched = await _productRepository.GetByIdsAsync(parsedIds);
                return Ok(matched.Select(ProductDto.FromEntity));
            }

            if (!string.IsNullOrWhiteSpace(q))
            {
                var matches = await _productRepository.SearchAsync(q.Trim(), sort);
                var items = matches.Select(ProductDto.FromEntity).ToList();
                return Ok(new ProductPageDto
                {
                    Items = items,
                    Total = items.Count,
                    Skip = 0,
                    Take = items.Count
                });
            }

            if (skip.HasValue || take.HasValue)
            {
                var offset = Math.Max(skip ?? 0, 0);
                var pageSize = Math.Clamp(take ?? 20, 1, 100);
                var page = await _productRepository.GetPageAsync(offset, pageSize, sort);
                return Ok(new ProductPageDto
                {
                    Items = page.Items.Select(ProductDto.FromEntity).ToList(),
                    Total = page.Total,
                    Skip = offset,
                    Take = pageSize
                });
            }

            var products = await _productRepository.GetAllAsync();
            return Ok(products.Select(ProductDto.FromEntity));
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
