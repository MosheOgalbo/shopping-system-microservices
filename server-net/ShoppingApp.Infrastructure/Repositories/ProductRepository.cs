using Microsoft.EntityFrameworkCore;
using ShoppingApp.Core.Models;
using ShoppingApp.Infrastructure.Data;

namespace ShoppingApp.Infrastructure.Repositories
{
    public readonly record struct ProductPage(IReadOnlyList<Product> Items, int Total);

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

        public async Task<ProductPage> GetPageAsync(int skip, int take, string? sort)
        {
            var query = CatalogQuery();
            var total = await query.CountAsync();
            var items = await ApplySort(query, sort).Skip(skip).Take(take).ToListAsync();
            return new ProductPage(items, total);
        }

        public async Task<IReadOnlyList<Product>> SearchAsync(string term, string? sort)
        {
            var query = CatalogQuery().Where(product =>
                product.Name.Contains(term) ||
                (product.Description != null && product.Description.Contains(term)));
            return await ApplySort(query, sort).ToListAsync();
        }

        private static IOrderedQueryable<Product> ApplySort(IQueryable<Product> query, string? sort) =>
            sort switch
            {
                "price-low" => query.OrderBy(product => product.Price).ThenBy(product => product.Name),
                "price-high" => query.OrderByDescending(product => product.Price).ThenBy(product => product.Name),
                _ => query.OrderBy(product => product.Name)
            };

        private IQueryable<Product> CatalogQuery() =>
            _context.Products
                .AsNoTracking()
                .Include(product => product.Category);
    }
}
