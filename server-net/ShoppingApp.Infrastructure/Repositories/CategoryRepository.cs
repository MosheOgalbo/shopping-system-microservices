using Microsoft.EntityFrameworkCore;
using ShoppingApp.Core.Models.DTOs;
using ShoppingApp.Infrastructure.Data;

namespace ShoppingApp.Infrastructure.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _context;

        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<CategoryDto>> GetAllAsync()
        {
            return await _context.Categories
                .AsNoTracking()
                .OrderBy(category => category.Name)
                .Select(category => new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    Description = category.Description,
                    CreatedAt = category.CreatedAt,
                    ProductCount = category.Products.Count()
                })
                .ToListAsync();
        }

        public async Task<CategoryDto?> GetByIdAsync(int id)
        {
            return await _context.Categories
                .AsNoTracking()
                .Where(category => category.Id == id)
                .Select(category => new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    Description = category.Description,
                    CreatedAt = category.CreatedAt,
                    ProductCount = category.Products.Count()
                })
                .FirstOrDefaultAsync();
        }

        public Task<bool> ExistsAsync(int id)
        {
            return _context.Categories.AsNoTracking().AnyAsync(category => category.Id == id);
        }
    }
}
