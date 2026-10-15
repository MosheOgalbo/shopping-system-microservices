# Project structure

## Request flow

```text
Browser (he / en / ar, light or dark)
        │
        ▼
shopping-client ──GET──► server-net ──► SQL Server
 React + Redux           .NET 10 + EF     categories + products
        │
        └──POST──► server-node ──► MongoDB
                   Express + Zod   user + order + items[]
                        │
                        └── reads catalog prices from server-net
```

## Root

| Path | Role |
|---|---|
| `README.md` | How to run, use, and test |
| `PROJECT_STRUCTURE.md` | This map |
| `QUALITY.md` | Contracts and system behavior |
| `AGENTS.md` | Coding-agent constraints |
| `docker-compose.yml` | Local full stack |
| `k8s/` | Kubernetes manifests and `deploy.sh` |
| `aws/` | ECR push, EKS cluster spec, ALB ingress |
| `e2e/` | Playwright tests against Compose |
| `.github/workflows/` | CI build and test |
| `shopping-client/` | UI |
| `server-net/` | Catalog API |
| `server-node/` | Orders API |

## Tree

```text
shopping-app/
├── README.md
├── docker-compose.yml
├── k8s/                         # namespace, data stores, APIs, UI, ingress
├── aws/                         # eksctl, ECR, ALB ingress
├── e2e/
├── shopping-client/
│   ├── public/favicon.svg
│   ├── public/catalog/          # local product photos
│   └── src/
│       ├── pages/               # ShoppingScreen, OrderScreen
│       ├── components/          # header, catalog, cart, checkout
│       ├── i18n/                # he, en, ar
│       ├── theme/               # light / dark
│       ├── services/            # catalogApi and orders HTTP
│       └── store/               # cart and API cache
├── server-net/
│   ├── ShoppingApp.API/
│   ├── ShoppingApp.Core/
│   ├── ShoppingApp.Infrastructure/
│   └── ShoppingApp.Tests/
└── server-node/src/
    ├── routes/ controllers/ models/
    ├── services/catalog.ts      # price authority
    └── validation/
```

## Services

### `shopping-client`

Loads the catalog when the shopping page opens, filters by category and search, and keeps the cart in Redux. Checkout posts the form and cart lines. Success requires a server order id.

Details: [`shopping-client/FILE_GUIDE.md`](./shopping-client/FILE_GUIDE.md)

### `server-net`

ASP.NET Core API. EF Core migrations run on startup. Seed data is the Hebrew catalog the client translates for English and Arabic.

Details: [`server-net/FILE_GUIDE.md`](./server-net/FILE_GUIDE.md)

### `server-node`

Validates the order with Zod, replaces client prices with catalog prices, and stores one MongoDB document per order.

Details: [`server-node/FILE_GUIDE.md`](./server-node/FILE_GUIDE.md)

## Data ownership

| Concern | Store |
|---|---|
| Categories and products | SQL Server |
| Customer and order document | MongoDB |
| Cart before checkout | Browser Redux store |
| Language and theme | Browser `localStorage` |
