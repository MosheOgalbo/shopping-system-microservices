# System quality

This document describes how the running system behaves, which contracts it keeps, and which libraries implement them.

## Boundaries

```text
Browser
  shopping-client
    GET  /api/Categories
    GET  /api/Products?skip=&take=     page of 20 while browsing
    GET  /api/Products?q=              every free-text match
    GET  /api/Products?ids=1,2
    GET  /api/Products/category/{id}   every product in the category
         → server-net → SQL Server
    POST /api/orders
         → server-node → MongoDB
              catalog prices loaded from server-net
```

Each service owns its database. The browser owns the cart until checkout succeeds. The cart is persisted in `localStorage`.

## Contracts

| Contract | Behavior |
|---|---|
| Created order | HTTP 201 body is `{ id, status }` |
| Failed order | UI shows an error and does not clear the cart |
| Catalog authority | Node loads the requested product ids and stores catalog name and price |
| Order document | Mongo stores a `customer` snapshot plus `items[]`. Later address changes do not rewrite older orders |
| Client payload | Checkout sends `{ user, items: [{ productId, quantity }] }` only |
| Unknown product | Order is rejected |
| Email lookup | No public `GET` orders-by-email endpoint |
| Catalog writes | `POST` / `PUT` / `DELETE` on catalog routes return 405 |

## Client behavior

| Area | Implementation |
|---|---|
| Screens | `/shopping` catalog + cart, `/order` checkout |
| Languages | Hebrew, English, Arabic (`src/i18n`). `he` and `ar` set `dir=rtl`; `en` sets `dir=ltr` |
| Catalog labels | Seeded Hebrew names are translated in the UI; the stored catalog stays Hebrew |
| Theme and cart | Light / dark and cart lines persist in `localStorage` |
| Search | Combobox with a product / category / price table. A category filter and free-text search show every match. Browsing the full catalog loads 20 products and asks the server for the next page on scroll |
| Accessibility | Skip link, labeled controls, live result text, dialog semantics, visible focus, reduced motion. Success dialog stays open until the user continues |
| Brand | FreshCart mark in the header and `public/favicon.svg` for the browser tab |
| Assets | Fonts are self-hosted. Catalog photos are local JPEGs under `public/catalog/` (same origin, no hotlinked CDNs) |

## Catalog API

- .NET 10, EF Core 10, SQL Server 2022.
- Layers: `ShoppingApp.API` (HTTP), `ShoppingApp.Core` (entities and DTOs), `ShoppingApp.Infrastructure` (DbContext, repositories, migrations).
- JSON is camelCase. Reads use `AsNoTracking`. SQL connections retry on transient failure.
- `/health` checks that the database accepts connections.
- Startup applies migrations and seeds six categories and one hundred products. Category product counts match the products in each category.
- `GET /api/Products` and `GET /api/Products?ids=` stay JSON arrays. `skip`/`take` and `q` return `{ items, total, skip, take }`. Search returns every match, not a page.
- CORS origins come from `Cors:AllowedOrigins`, defaulting to the local Vite origin.

## Orders API

- Node 22, Express 5, Mongoose 8, Zod 4.
- `POST /api/orders` validates the customer and line items, authorizes them against the catalog, stores the order first, then upserts the user by email.
- `/health` pings MongoDB. CORS allows `GET`, `POST`, and `OPTIONS` only.
- `CATALOG_API_URL` and `MONGO_URI` are required at runtime. `CORS_ORIGINS` lists allowed browser origins.

## Delivery

| Path | Entry |
|---|---|
| Local | `docker compose up --build` |
| Kubernetes | `./k8s/deploy.sh` |
| AWS | `./aws/deploy-eks.sh` (ECR + EKS) |

Kubernetes and AWS images for the UI are built with relative `/api/` URLs so one Ingress host can route catalog and orders.

## Verification

| Suite | What it proves |
|---|---|
| `server-net` tests | Health, catalog reads, category filter, write methods are not exposed |
| `server-node` tests | Zod rules, catalog price authority, customer snapshot, idempotency, unknown product, no email lookup |
| `shopping-client` tests | Cart quantity, required checkout fields |
| Playwright | Full checkout, API failure keeps the cart, price authority |

## Stack snapshot

| Piece | Version line |
|---|---|
| React / Vite / Redux Toolkit | 19 / 7 / 2 |
| .NET / EF Core | 10 |
| Node / Express / Mongoose / Zod | 22 / 5 / 8 / 4 |
| SQL Server / MongoDB images | 2022 / 7 |
