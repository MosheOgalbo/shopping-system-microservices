using Microsoft.AspNetCore.Mvc;
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
                return Ok(categories.Select(CategoryDto.FromEntity));
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

                return Ok(CategoryDto.FromEntity(category));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "שגיאה בשליפת קטגוריה {CategoryId}", id);
                return StatusCode(500, "שגיאה פנימית בשרת");
            }
        }
    }
}
