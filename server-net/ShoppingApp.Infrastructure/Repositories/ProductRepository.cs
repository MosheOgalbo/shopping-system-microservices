using Microsoft.EntityFrameworkCore;
using ShoppingApp.Core.Models;
using ShoppingApp.Infrastructure.Data;

namespace ShoppingApp.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await CatalogQuery()
                .OrderBy(product => product.Name)
                .ToListAsync();
        }

        public Task<Product?> GetByIdAsync(int id)
        {
            return CatalogQuery().FirstOrDefaultAsync(product => product.Id == id);
        }

        public async Task<IEnumerable<Product>> GetByCategoryIdAsync(int categoryId)
        {
            return await CatalogQuery()
                .Where(product => product.CategoryId == categoryId)
                .OrderBy(product => product.Name)
                .ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetByIdsAsync(IReadOnlyCollection<int> ids)
        {
            if (ids.Count == 0)
            {
                return [];
            }

            return await CatalogQuery()
                .Where(product => ids.Contains(product.Id))
                .ToListAsync();
        }

        private IQueryable<Product> CatalogQuery() =>
            _context.Products
                .AsNoTracking()
                .Include(product => product.Category);
    }
}
