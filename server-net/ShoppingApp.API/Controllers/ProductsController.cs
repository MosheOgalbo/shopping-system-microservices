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
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(
            IProductRepository productRepository,
            ICategoryRepository categoryRepository,
            ILogger<ProductsController> logger)
        {
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
            _logger = logger;
        }

        /// <summary>
        /// מחזיר את כל המוצרים
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            try
            {
                var products = await _productRepository.GetAllAsync();
                return Ok(products.Select(ProductDto.FromEntity));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "שגיאה בשליפת המוצרים");
                return StatusCode(500, "שגיאה פנימית בשרת");
            }
        }

        /// <summary>
        /// מחזיר מוצר לפי ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            try
            {
                var product = await _productRepository.GetByIdAsync(id);
                if (product == null)
                {
                    return NotFound($"מוצר עם ID {id} לא נמצא");
                }

                return Ok(ProductDto.FromEntity(product));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "שגיאה בשליפת מוצר {ProductId}", id);
                return StatusCode(500, "שגיאה פנימית בשרת");
            }
        }

        /// <summary>
        /// מחזיר מוצרים לפי ID קטגוריה
        /// </summary>
        [HttpGet("category/{categoryId}")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsByCategory(int categoryId)
        {
            try
            {
                if (!await _categoryRepository.ExistsAsync(categoryId))
                {
                    return NotFound($"קטגוריה עם ID {categoryId} לא נמצאה");
                }

                var products = await _productRepository.GetByCategoryIdAsync(categoryId);
                return Ok(products.Select(ProductDto.FromEntity));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "שגיאה בשליפת מוצרים לקטגוריה {CategoryId}", categoryId);
                return StatusCode(500, "שגיאה פנימית בשרת");
            }
        }

        /// <summary>
        /// מחזיר מוצרים לפי שם קטגוריה
        /// </summary>
        [HttpGet("category/name/{categoryName}")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsByCategoryName(string categoryName)
        {
            try
            {
                var category = await _categoryRepository.GetByNameAsync(categoryName);
                if (category == null)
                {
                    return NotFound($"קטגוריה עם שם '{categoryName}' לא נמצאה");
                }

                var products = await _productRepository.GetByCategoryIdAsync(category.Id);
                return Ok(products.Select(ProductDto.FromEntity));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "שגיאה בשליפת מוצרים לקטגוריה {CategoryName}", categoryName);
                return StatusCode(500, "שגיאה פנימית בשרת");
            }
        }
    }
}
