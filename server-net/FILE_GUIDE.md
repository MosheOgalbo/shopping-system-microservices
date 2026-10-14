# server-net — File Guide

English map of the catalog API: purpose, key types/methods, why each file exists, and project impact.

## Root / tooling

| File | What it does | Key symbols | Why / impact |
|---|---|---|---|
| `ShoppingApp.sln` | Solution containing API, Core, Infrastructure, Tests | — | Single entry for `dotnet build` / `dotnet test` |
| `Dockerfile` | Multi-stage .NET 10 publish image | `sdk:10.0`, `aspnet:10.0` | Runs catalog API in Compose |
| `.dockerignore` | Skips `bin`/`obj` from build context | — | Faster Docker builds |
| `dotnet-tools.json` | Local `dotnet-ef` tool pin | `dotnet-ef 10.0.13` | Repeatable migrations |
| `FILE_GUIDE.md` | This file | — | AI/human navigation |

## ShoppingApp.API (HTTP host)

| File | What it does | Key symbols | Why / impact |
|---|---|---|---|
| `Program.cs` | App composition root | `AddDbContext`, `UseSqlServer`, CORS, Swagger, `MigrateAsync`, `/health` | Wires DI, DB, middleware; starts listening |
| `Controllers/CategoriesController.cs` | Category read endpoints | `GetCategories`, `GetCategory` | Supplies the category filter. Writes are not exposed |
| `Controllers/ProductsController.cs` | Product read endpoints | `GetProducts`, `GetProduct`, `GetProductsByCategory` | Main catalog feed for the React screen |
| `appsettings.json` | Default SQL connection + logging | `ConnectionStrings:DefaultConnection` | Local/non-Compose config baseline |
| `appsettings.Development.json` | Dev logging overrides | — | Quieter Microsoft framework logs in Development |
| `Properties/launchSettings.json` | Local launch URLs | `http://localhost:5177` | `dotnet run` profile for the API |
| `ShoppingApp.API.csproj` | Web project + NuGet refs | `net10.0`, EF SQL Server, Swashbuckle | Declares framework and packages |
| `ShoppingApp.API.http` | Manual HTTP scratch file | — | Quick local request samples |

### Controller method impact

- `GET /api/Categories` → filter dropdown data.
- `GET /api/Products` → full catalog on shopping page load.
- `GET /api/Products/category/{id}` → category-filtered catalog.
- `POST`, `PUT`, and `DELETE` are not mapped. The assignment only needs catalog reads.

## ShoppingApp.Core (domain)

| File | What it does | Key symbols | Why / impact |
|---|---|---|---|
| `ShoppingApp.Core.csproj` | Class library target `net10.0` | — | Keeps domain free of EF/SQL details |
| `Models/Category.cs` | Category entity | `Id`, `Name`, `Description`, `Products` | Relational parent of products |
| `Models/Product.cs` | Product entity | `Price`, `CategoryId`, `Image` | Catalog item persisted in SQL Server |
| `Models/DTOs/CategoryDto.cs` | API-facing category shape | `ProductCount` | Avoids leaking full entity graphs |
| `Models/DTOs/ProductDto.cs` | API-facing product shape | `CategoryName`, `Image`, `FromEntity` | Stable JSON for React |

## ShoppingApp.Infrastructure (data access)

| File | What it does | Key symbols | Why / impact |
|---|---|---|---|
| `ShoppingApp.Infrastructure.csproj` | EF Core + SQL Server packages | EF `10.0.13` | Data layer dependencies |
| `Data/ApplicationDbContext.cs` | EF model, relationships, seed data | `DbSet<Category/Product>`, `OnModelCreating`, `HasData` | Schema + demo catalog content |
| `Repositories/ICategoryRepository.cs` | Category persistence contract | `GetAllAsync`, `ExistsAsync`, … | Testable abstraction for controllers |
| `Repositories/CategoryRepository.cs` | Category EF implementation | `Include(c => c.Products)` | Eager-loads product counts/relations |
| `Repositories/IProductRepository.cs` | Product persistence contract | `GetByCategoryIdAsync`, … | Isolates query details |
| `Repositories/ProductRepository.cs` | Product EF implementation | `Include(p => p.Category)` | Ensures `CategoryName` is available for DTOs |
| `Migrations/20261014115319_InitialSqlServer.cs` | Initial SQL Server schema + seed | `Up`/`Down` | Creates tables on first run |
| `Migrations/*Designer.cs` / `ApplicationDbContextModelSnapshot.cs` | EF model snapshots | — | Required by EF tooling |
| `Data/ApplicationDbContextFactory.cs` | EF design-time factory | `IDesignTimeDbContextFactory` | Lets `dotnet ef` build the context without starting the API |

### Notable design choices

- `OnDelete(DeleteBehavior.Restrict)` prevents silent cascade deletes of products when a category is removed.
- Seed data includes Hebrew category/product names and image URLs for a polished demo.
- Controllers map entities → DTOs so JSON stays PascalCase-compatible with the current client transformers.

## ShoppingApp.Tests

| File | What it does | Key symbols | Why / impact |
|---|---|---|---|
| `ShoppingApp.Tests.csproj` | xUnit + WebApplicationFactory + InMemory EF | — | Integration-style API tests without SQL Server |
| `CatalogApiFactory.cs` | Test host factory | replaces SQL with InMemory DB, `Testing` env | Deterministic tests |
| `CatalogApiTests.cs` | Endpoint assertions | health, categories, products, category filter, delete guard | Proves catalog contract for the client |

## How the catalog service fits the assignment

1. React calls `/api/Categories` and `/api/Products` on screen 1 load.
2. Choosing a category calls `/api/Products/category/{id}`.
3. SQL Server stores the relational catalog; EF migrations keep schema reproducible in Docker.
