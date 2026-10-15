using ShoppingApp.Core.Models;

namespace ShoppingApp.Infrastructure.Repositories
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllAsync();
        Task<Product?> GetByIdAsync(int id);
        Task<IEnumerable<Product>> GetByCategoryIdAsync(int categoryId);
        Task<IEnumerable<Product>> GetByIdsAsync(IReadOnlyCollection<int> ids);
        Task<ProductPage> GetPageAsync(int skip, int take, string? sort);
        Task<IReadOnlyList<Product>> SearchAsync(string term, string? sort);
    }
}
