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
        Assert.Contains(categories, category => category.Name == "בית");
        Assert.Contains(categories, category => category.Name == "ספורט");
        Assert.Contains(categories, category => category.Name == "מזון");
        Assert.Equal(100, categories.Sum(category => category.ProductCount));
    }

    [Fact]
    public async Task CategoryProductCounts_MatchProductsInThatCategory()
    {
        var categoriesResponse = await _client.GetAsync("/api/Categories");
        var categories = await categoriesResponse.Content.ReadFromJsonAsync<List<CategoryResponse>>();
        Assert.NotNull(categories);

        foreach (var category in categories)
        {
            var productsResponse = await _client.GetAsync($"/api/Products/category/{category.Id}");
            var products = await productsResponse.Content.ReadFromJsonAsync<List<ProductResponse>>();
            Assert.NotNull(products);
            Assert.Equal(category.ProductCount, products.Count);
            Assert.All(products, product => Assert.Equal(category.Id, product.CategoryId));
        }
    }

    [Fact]
    public async Task GetProducts_ReturnsProductsWithCategory()
    {
        var response = await _client.GetAsync("/api/Products");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var products = await response.Content.ReadFromJsonAsync<List<ProductResponse>>();
        Assert.NotNull(products);
        Assert.Equal(100, products.Count);
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
        Assert.Contains(products, product => product.Name == "חולצת Nike Dri-FIT כחולה");
    }

    [Fact]
    public async Task GetProductsByIds_ReturnsOnlyThoseProducts()
    {
        var response = await _client.GetAsync("/api/Products?ids=3,5");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var products = await response.Content.ReadFromJsonAsync<List<ProductResponse>>();
        Assert.NotNull(products);
        Assert.Equal(2, products.Count);
        Assert.Contains(products, product => product.Name == "חולצת Nike Dri-FIT כחולה");
        Assert.Contains(products, product => product.Name == "קוד נקי");
    }

    [Fact]
    public async Task GetProducts_Page_ReturnsTwentyOfOneHundred()
    {
        var first = await _client.GetFromJsonAsync<ProductPageResponse>("/api/Products?skip=0&take=20&sort=name");
        var second = await _client.GetFromJsonAsync<ProductPageResponse>("/api/Products?skip=20&take=20&sort=name");

        Assert.NotNull(first);
        Assert.NotNull(second);
        Assert.Equal(100, first.Total);
        Assert.Equal(20, first.Items.Count);
        Assert.Equal(20, second.Items.Count);
        Assert.Equal(0, first.Skip);
        Assert.DoesNotContain(second.Items.Select(item => item.Id), id => first.Items.Any(item => item.Id == id));
        Assert.True(string.Compare(first.Items[0].Name, first.Items[1].Name, StringComparison.CurrentCulture) <= 0);
    }

    [Fact]
    public async Task GetProducts_Search_ReturnsEveryMatch()
    {
        var page = await _client.GetFromJsonAsync<ProductPageResponse>("/api/Products?q=" + Uri.EscapeDataString("דבש"));

        Assert.NotNull(page);
        Assert.Equal(page.Items.Count, page.Total);
        Assert.True(page.Items.Count >= 3);
        Assert.All(page.Items, item => Assert.Contains("דבש", item.Name + item.Description));
        Assert.Contains(page.Items, item => item.Name == "דבש טהור יד מרדכי");
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
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = "";
    }

    private sealed class ProductPageResponse
    {
        public List<ProductResponse> Items { get; set; } = [];
        public int Total { get; set; }
        public int Skip { get; set; }
        public int Take { get; set; }
    }
}
