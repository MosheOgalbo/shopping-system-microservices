using Microsoft.AspNetCore.Mvc;
using ShoppingApp.Core.Models;
using ShoppingApp.Core.Models.DTOs;
using ShoppingApp.Infrastructure.Repositories;

namespace ShoppingApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly ILogger<CategoriesController> _logger;

        public CategoriesController(ICategoryRepository categoryRepository, ILogger<CategoriesController> logger)
        {
            _categoryRepository = categoryRepository;
            _logger = logger;
        }

        /// <summary>
        /// מחזיר את כל הקטגוריות
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            try
            {
                var categories = await _categoryRepository.GetAllAsync();

                var categoryDtos = categories.Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description,
                    CreatedAt = c.CreatedAt,
                    ProductCount = c.Products.Count
                });

                return Ok(categoryDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "שגיאה בשליפת הקטגוריות");
                return StatusCode(500, "שגיאה פנימית בשרת");
            }
        }

        /// <summary>
        /// מחזיר קטגוריה לפי ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetCategory(int id)
        {
            try
            {
                var category = await _categoryRepository.GetByIdAsync(id);
                if (category == null)
                {
                    return NotFound($"קטגוריה עם ID {id} לא נמצאה");
                }

                var categoryDto = new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    Description = category.Description,
                    CreatedAt = category.CreatedAt,
                    ProductCount = category.Products.Count
                };

                return Ok(categoryDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "שגיאה בשליפת קטגוריה {CategoryId}", id);
                return StatusCode(500, "שגיאה פנימית בשרת");
            }
        }

        /// <summary>
        /// יצירת קטגוריה חדשה
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<CategoryDto>> CreateCategory(CreateCategoryDto createCategoryDto)
        {
            try
            {
                // בדיקה אם קיים שם זהה (למניעת כפילויות)
                if (await _categoryRepository.CategoryNameExistsAsync(createCategoryDto.Name))
                {
                    return BadRequest("קטגוריה עם שם זה כבר קיימת");
                }

                var category = new Category
                {
                    Name = createCategoryDto.Name,
                    Description = createCategoryDto.Description
                };

                var createdCategory = await _categoryRepository.CreateAsync(category);

                var categoryDto = new CategoryDto
                {
                    Id = createdCategory.Id,
                    Name = createdCategory.Name,
                    Description = createdCategory.Description,
                    CreatedAt = createdCategory.CreatedAt,
                    ProductCount = 0
                };

                // מחזיר Location Header עם ה-URL של הקטגוריה החדשה
                return CreatedAtAction(nameof(GetCategory), new { id = categoryDto.Id }, categoryDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "שגיאה ביצירת קטגוריה");
                return StatusCode(500, "שגיאה פנימית בשרת");
            }
        }

        /// <summary>
        /// עדכון קטגוריה קיימת
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<CategoryDto>> UpdateCategory(int id, UpdateCategoryDto updateCategoryDto)
        {
            try
            {
                var existingCategory = await _categoryRepository.GetByIdAsync(id);
                if (existingCategory == null)
                {
                    return NotFound($"קטגוריה עם ID {id} לא נמצאה");
                }

                // בדיקה לשם כפול בקטגוריות אחרות
                if (await _categoryRepository.CategoryNameExistsAsync(updateCategoryDto.Name, id))
                {
                    return BadRequest("קטגוריה עם שם זה כבר קיימת");
                }

                existingCategory.Name = updateCategoryDto.Name;
                existingCategory.Description = updateCategoryDto.Description;

                var updatedCategory = await _categoryRepository.UpdateAsync(existingCategory);

                var categoryDto = new CategoryDto
                {
                    Id = updatedCategory.Id,
                    Name = updatedCategory.Name,
                    Description = updatedCategory.Description,
                    CreatedAt = updatedCategory.CreatedAt,
                    ProductCount = updatedCategory.Products.Count
                };

                return Ok(categoryDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "שגיאה בעדכון קטגוריה {CategoryId}", id);
                return StatusCode(500, "שגיאה פנימית בשרת");
            }
        }

        /// <summary>
        /// מחיקת קטגוריה
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            try
            {
                var category = await _categoryRepository.GetByIdAsync(id);
                if (category == null)
                {
                    return NotFound($"קטגוריה עם ID {id} לא נמצאה");
                }

                // בדיקה אם יש מוצרים משויכים — לא ניתן למחוק קטגוריה כזו
                if (category.Products.Any())
                {
                    return BadRequest("לא ניתן למחוק קטגוריה עם מוצרים. יש למחוק קודם את המוצרים או להעביר לקטגוריה אחרת");
                }

                var deleted = await _categoryRepository.DeleteAsync(id);
                if (!deleted)
                {
                    return NotFound($"קטגוריה עם ID {id} לא נמצאה");
                }

                // מחזיר 204 No Content
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "שגיאה במחיקת קטגוריה {CategoryId}", id);
                return StatusCode(500, "שגיאה פנימית בשרת");
            }
        }
    }
}
