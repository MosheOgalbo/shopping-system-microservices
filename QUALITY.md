# System quality

This document describes how the running system behaves, which contracts it keeps, and which libraries implement them.

## Boundaries

```text
Browser
  shopping-client
    GET  /api/Categories
    GET  /api/Products
    GET  /api/Products/category/{id}
         → server-net → SQL Server
    POST /api/orders
         → server-node → MongoDB
              catalog prices loaded from server-net
```

Each service owns its database. The browser owns the cart until checkout succeeds.

## Contracts

| Contract | Behavior |
|---|---|
| Created order | HTTP 201 body is `{ id, status }` |
| Failed order | UI shows an error and does not clear the cart |
| Catalog authority | Node overwrites client name and price with the SQL catalog before save |
| Unknown product | Order is rejected |
| Email lookup | No public `GET` orders-by-email endpoint |
| Category delete | Catalog API refuses to delete a category that still has products |

## Client behavior

| Area | Implementation |
|---|---|
| Screens | `/shopping` catalog + cart, `/order` checkout |
| Languages | Hebrew, English, Arabic (`src/i18n`). `he` and `ar` set `dir=rtl`; `en` sets `dir=ltr` |
| Catalog labels | Seeded Hebrew names are translated in the UI; the stored catalog stays Hebrew |
| Theme | Light / dark, class `dark` on `<html>`, persisted in `localStorage` |
| Search | Combobox with a product / category / price table filtered by the selected category |
| Accessibility | Skip link, labeled controls, live result text, dialog semantics, visible focus, reduced motion |
| Brand | FreshCart mark in the header and `public/favicon.svg` for the browser tab |

## Catalog API

- .NET 10, EF Core 10, SQL Server 2022.
- Layers: `ShoppingApp.API` (HTTP), `ShoppingApp.Core` (entities and DTOs), `ShoppingApp.Infrastructure` (DbContext, repositories, migrations).
- Startup applies migrations and seeds three categories and six products.
- CORS origins come from `Cors:AllowedOrigins`, defaulting to the local Vite origin.

## Orders API

- Node 22, Express 5, Mongoose 8, Zod 4.
- `POST /api/orders` validates the customer and line items, authorizes them against the catalog, upserts the user by email, and stores the order document.
- `CATALOG_API_URL` points at the .NET service. `CORS_ORIGINS` lists allowed browser origins.

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
| `server-net` tests | Health, catalog reads, category filter, delete guard |
| `server-node` tests | Zod rules, catalog price override, unknown product, no email lookup |
| `shopping-client` tests | Cart quantity, required checkout fields |
| Playwright | Full checkout, API failure keeps the cart, price authority |

## Stack snapshot

| Piece | Version line |
|---|---|
| React / Vite / Redux Toolkit | 19 / 7 / 2 |
| .NET / EF Core | 10 |
| Node / Express / Mongoose / Zod | 22 / 5 / 8 / 4 |
| SQL Server / MongoDB images | 2022 / 7 |

Unused client packages from earlier scaffolding (`formik`, `yup`, MUI, `axios`) are not part of the current screens.
