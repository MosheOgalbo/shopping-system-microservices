# FreshCart

Three-service shopping system: a React client, a .NET catalog API on SQL Server, and a Node orders API on MongoDB.

The short Hebrew submission note is [`SUBMISSION.md`](./SUBMISSION.md). MongoDB is used for the order document; Elasticsearch is not required for checkout.

| Service | Stack | Responsibility |
|---|---|---|
| `shopping-client` | React, Redux Toolkit, Vite | Catalog, cart, checkout UI |
| `server-net` | .NET 10, EF Core, SQL Server | Categories and products |
| `server-node` | Node.js, Express, MongoDB | Persist a real order |

MongoDB satisfies the NoSQL requirement. Elasticsearch is not used.

## Documentation

| File | Contents |
|---|---|
| [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md) | Repository layout and request flow |
| [`QUALITY.md`](./QUALITY.md) | System contracts, behavior, and stack |
| [`shopping-client/FILE_GUIDE.md`](./shopping-client/FILE_GUIDE.md) | Client modules |
| [`server-net/FILE_GUIDE.md`](./server-net/FILE_GUIDE.md) | Catalog API |
| [`server-node/FILE_GUIDE.md`](./server-node/FILE_GUIDE.md) | Orders API |
| [`k8s/README.md`](./k8s/README.md) | Local Kubernetes |
| [`aws/README.md`](./aws/README.md) | ECR and EKS |
| [`e2e/README.md`](./e2e/README.md) | Playwright suite |
| [`SUBMISSION.md`](./SUBMISSION.md) | Hebrew hand-in note with the Git link |
| [`AGENTS.md`](./AGENTS.md) | Constraints for coding agents |

## Run with Docker

```bash
docker compose up --build
```

| Service | URL |
|---|---|
| UI | http://localhost:5173 |
| Catalog | http://localhost:5177/api/Products |
| Orders | http://localhost:5001/api/orders |
| Catalog health | http://localhost:5177/health |
| Orders health | http://localhost:5001/health |

The first SQL Server start can take one to two minutes.

## Product flow

1. The shopping screen loads categories and products from the catalog API.
2. Category, search, and sort narrow the catalog. Quantity is chosen on the product card, then **Add to cart**.
3. The cart stays on the same screen. **Continue to checkout** opens the order screen.
4. Checkout requires first name, last name, full address, and email, and lists the selected products.
5. **Confirm order** posts to the orders API. MongoDB stores the customer and the item array. The UI shows success only after `{ id, status }` returns. A failed save keeps the cart and shows an error.

The UI supports Hebrew (default, RTL), English (LTR), and Arabic (RTL), plus light and dark themes. Language and theme are stored in the browser.

## Kubernetes and AWS

```bash
chmod +x k8s/*.sh
./k8s/deploy.sh

chmod +x aws/*.sh
export AWS_REGION=eu-west-1
./aws/deploy-eks.sh
```

See [`k8s/README.md`](./k8s/README.md) and [`aws/README.md`](./aws/README.md).

## Tests

```bash
cd server-net && dotnet test
cd server-node && npm test
cd shopping-client && npm test

docker compose up --build -d
cd e2e && npm ci && npx playwright install chromium && npm test
```

## Local development without Docker

Copy `.env.example` to `.env` and set local SQL Server and MongoDB passwords there. Compose reads that file. Do not commit `.env`.

- SQL Server on port `1433`, user `sa`. Pass `ConnectionStrings__DefaultConnection` from the same password when running the catalog API outside Compose.
- MongoDB on port `27017`. Set `MONGO_URI` for the orders API outside Compose.
- `dotnet run --project server-net/ShoppingApp.API`
- `npm run dev` inside `server-node` and `shopping-client`.
