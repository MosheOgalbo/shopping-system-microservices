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

        public CategoriesController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        /// <summary>
        /// מחזיר את כל הקטגוריות
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            var categories = await _categoryRepository.GetAllAsync();
            return Ok(categories);
        }

        /// <summary>
        /// מחזיר קטגוריה לפי ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetCategory(int id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);
            if (category == null)
            {
                return NotFound($"קטגוריה עם ID {id} לא נמצאה");
            }

            return Ok(category);
        }
    }
}
