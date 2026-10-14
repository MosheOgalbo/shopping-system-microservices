using System.Net;
using System.Net.Http.Json;
using Xunit;

namespace ShoppingApp.Tests;

public class CatalogApiTests : IClassFixture<CatalogApiFactory>
{
    private readonly HttpClient _client;

    public CatalogApiTests(CatalogApiFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task Health_ReturnsOk()
    {
        var response = await _client.GetAsync("/health");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task GetCategories_ReturnsSeededCategories()
    {
        var response = await _client.GetAsync("/api/Categories");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var categories = await response.Content.ReadFromJsonAsync<List<CategoryResponse>>();
        Assert.NotNull(categories);
        Assert.Contains(categories, category => category.Name == "אלקטרוניקה");
        Assert.Contains(categories, category => category.Name == "ביגוד");
        Assert.Contains(categories, category => category.Name == "ספרים");
    }

    [Fact]
    public async Task GetProducts_ReturnsProductsWithCategory()
    {
        var response = await _client.GetAsync("/api/Products");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var products = await response.Content.ReadFromJsonAsync<List<ProductResponse>>();
        Assert.NotNull(products);
        Assert.True(products.Count >= 6);
        Assert.All(products, product =>
        {
            Assert.False(string.IsNullOrWhiteSpace(product.Name));
            Assert.False(string.IsNullOrWhiteSpace(product.CategoryName));
            Assert.True(product.Price > 0);
        });
    }

    [Fact]
    public async Task GetProductsByCategory_ReturnsOnlyThatCategory()
    {
        var response = await _client.GetAsync("/api/Products/category/2");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var products = await response.Content.ReadFromJsonAsync<List<ProductResponse>>();
        Assert.NotNull(products);
        Assert.NotEmpty(products);
        Assert.All(products, product => Assert.Equal(2, product.CategoryId));
        Assert.Contains(products, product => product.Name == "חולצה כחולה");
    }

    [Fact]
    public async Task GetProductsByUnknownCategory_ReturnsNotFound()
    {
        var response = await _client.GetAsync("/api/Products/category/999");

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Theory]
    [InlineData("POST", "/api/Products")]
    [InlineData("PUT", "/api/Products/1")]
    [InlineData("DELETE", "/api/Products/1")]
    [InlineData("POST", "/api/Categories")]
    [InlineData("PUT", "/api/Categories/1")]
    [InlineData("DELETE", "/api/Categories/1")]
    public async Task CatalogWrites_AreNotExposed(string method, string path)
    {
        var response = await _client.SendAsync(new HttpRequestMessage(new HttpMethod(method), path));

        Assert.Equal(HttpStatusCode.MethodNotAllowed, response.StatusCode);
    }

    private sealed class CategoryResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public int ProductCount { get; set; }
    }

    private sealed class ProductResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = "";
    }
}
