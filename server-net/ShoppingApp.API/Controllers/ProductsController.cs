using Microsoft.AspNetCore.Mvc;
using ShoppingApp.Core.Models;
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
        /// שליפת כל המוצרים
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            try
            {
                var products = await _productRepository.GetAllAsync();
                var productDtos = products.Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.Name,
                    CreatedAt = p.CreatedAt
                });

                return Ok(productDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "שגיאה בשליפת המוצרים");
                return StatusCode(500, "שגיאה פנימית בשרת");
            }
        }

        /// <summary>
        /// שליפת מוצר לפי ID
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

                var productDto = new ProductDto
                {
                    Id = product.Id,
                    Name = product.Name,
                    Description = product.Description,
                    Price = product.Price,
                    CategoryId = product.CategoryId,
                    CategoryName = product.Category.Name,
                    CreatedAt = product.CreatedAt
                };

                return Ok(productDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "שגיאה בשליפת מוצר {ProductId}", id);
                return StatusCode(500, "שגיאה פנימית בשרת");
            }
        }

        /// <summary>
        /// שליפת מוצרים לפי ID קטגוריה
        /// </summary>
        [HttpGet("category/{categoryId}")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsByCategory(int categoryId)
        {
            try
            {
                // בדיקה שהקטגוריה קיימת
                if (!await _categoryRepository.ExistsAsync(categoryId))
                {
                    return NotFound($"קטגוריה עם ID {categoryId} לא נמצאה");
                }

                var products = await _productRepository.GetByCategoryIdAsync(categoryId);
                var productDtos = products.Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.Name,
                    CreatedAt = p.CreatedAt
                });

                return Ok(productDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "שגיאה בשליפת מוצרים לקטגוריה {CategoryId}", categoryId);
                return StatusCode(500, "שגיאה פנימית בשרת");
            }
        }

        /// <summary>
        /// שליפת מוצרים לפי שם קטגוריה
        /// </summary>
        [HttpGet("category/name/{categoryName}")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsByCategoryName(string categoryName)
        {
            try
            {
                // בדיקה שהקטגוריה קיימת
                var category = await _categoryRepository.GetByNameAsync(categoryName);
                if (category == null)
                {
                    return NotFound($"קטגוריה עם שם '{categoryName}' לא נמצאה");
                }

                var products = await _productRepository.GetByCategoryIdAsync(category.Id);
                var productDtos = products.Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.Name,
                    CreatedAt = p.CreatedAt
                });

                return Ok(productDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "שגיאה בשליפת מוצרים לקטגוריה {CategoryName}", categoryName);
                return StatusCode(500, "שגיאה פנימית בשרת");
            }
        }

        /// <summary>
        /// יצירת מוצר חדש
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<ProductDto>> CreateProduct(CreateProductDto createProductDto)
        {
            try
            {
                // בדיקה שהקטגוריה קיימת
                if (!await _categoryRepository.ExistsAsync(createProductDto.CategoryId))
                {
                    return BadRequest($"קטגוריה עם ID {createProductDto.CategoryId} לא נמצאה");
                }

                var product = new Product
                {
                    Name = createProductDto.Name,
                    Description = createProductDto.Description,
                    Price = createProductDto.Price,
                    CategoryId = createProductDto.CategoryId
                };

                var createdProduct = await _productRepository.CreateAsync(product);

                var productDto = new ProductDto
                {
                    Id = createdProduct.Id,
                    Name = createdProduct.Name,
                    Description = createdProduct.Description,
                    Price = createdProduct.Price,
                    CategoryId = createdProduct.CategoryId,
                    CategoryName = createdProduct.Category.Name,
                    CreatedAt = createdProduct.CreatedAt
                };

                return CreatedAtAction(nameof(GetProduct), new { id = productDto.Id }, productDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "שגיאה ביצירת מוצר");
                return StatusCode(500, "שגיאה פנימית בשרת");
            }
        }

        /// <summary>
        /// עדכון מוצר
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<ProductDto>> UpdateProduct(int id, UpdateProductDto updateProductDto)
        {
            try
            {
                var existingProduct = await _productRepository.GetByIdAsync(id);
                if (existingProduct == null)
                {
                    return NotFound($"מוצר עם ID {id} לא נמצא");
                }

                // בדיקה שהקטגוריה החדשה קיימת
                if (!await _categoryRepository.ExistsAsync(updateProductDto.CategoryId))
                {
                    return BadRequest($"קטגוריה עם ID {updateProductDto.CategoryId} לא נמצאה");
                }

                existingProduct.Name = updateProductDto.Name;
                existingProduct.Description = updateProductDto.Description;
                existingProduct.Price = updateProductDto.Price;
                existingProduct.CategoryId = updateProductDto.CategoryId;

                var updatedProduct = await _productRepository.UpdateAsync(existingProduct);

                var productDto = new ProductDto
                {
                    Id = updatedProduct.Id,
                    Name = updatedProduct.Name,
                    Description = updatedProduct.Description,
                    Price = updatedProduct.Price,
                    CategoryId = updatedProduct.CategoryId,
                    CategoryName = updatedProduct.Category.Name,
                    CreatedAt = updatedProduct.CreatedAt
                };

                return Ok(productDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "שגיאה בעדכון מוצר {ProductId}", id);
                return StatusCode(500, "שגיאה פנימית בשרת");
            }
        }

        /// <summary>
        /// מחיקת מוצר
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
                var deleted = await _productRepository.DeleteAsync(id);
                if (!deleted)
                {
                    return NotFound($"מוצר עם ID {id} לא נמצא");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "שגיאה במחיקת מוצר {ProductId}", id);
                return StatusCode(500, "שגיאה פנימית בשרת");
            }
        }
    }
}
