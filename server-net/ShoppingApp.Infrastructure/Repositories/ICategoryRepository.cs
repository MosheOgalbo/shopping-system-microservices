using ShoppingApp.Core.Models.DTOs;

namespace ShoppingApp.Infrastructure.Repositories
{
    public interface ICategoryRepository
    {
        Task<IReadOnlyList<CategoryDto>> GetAllAsync();
        Task<CategoryDto?> GetByIdAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}
