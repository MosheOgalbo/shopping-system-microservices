# server-node — File Guide

English map of the orders API: purpose, key functions, why each file exists, and project impact.

## Root / tooling

| File | What it does | Key symbols | Why / impact |
|---|---|---|---|
| `package.json` | Scripts and dependencies | `express`, `mongoose`, `zod`, `jest` | Defines the Node service runtime |
| `package-lock.json` | Locked dependency tree | — | Reproducible Docker/CI installs |
| `tsconfig.json` | TypeScript compile settings | `outDir: dist`, excludes `*.test.ts` | Emits runnable JS for production |
| `jest.config.cjs` | Jest + ts-jest config | `testMatch: **/*.test.ts` | Unit/integration test runner |
| `Dockerfile` | Build TypeScript, prune deps, healthcheck `/health` | Node 22 Alpine | Orders API image for Compose |
| `.dockerignore` | Ignores `node_modules`/`dist` | — | Faster image builds |
| `FILE_GUIDE.md` | This file | — | AI/human navigation |

## Application entry

| File | What it does | Key symbols | Why / impact |
|---|---|---|---|
| `src/index.ts` | Creates Express app, CORS, Swagger, health routes, error middleware, startup | `createApp`, `start`, `/health`, `/healthz` | Process entry; waits for Mongo before listen |
| `src/config/db.ts` | Mongoose connection helper | `connectDB` | Centralizes Mongo URI handling and fatal connect errors |

### Exported helpers

- `createApp()` — used by tests without binding a port.
- `start()` — production boot: connect DB → listen → graceful shutdown hooks.

## HTTP layer

| File | What it does | Key symbols | Why / impact |
|---|---|---|---|
| `src/routes/order.routes.ts` | Route table for orders | `POST /`, `GET /:email` | Maps URLs to controllers; Swagger annotations |
| `src/controllers/order.controller.ts` | Business handlers | `createOrder`, `getOrdersByEmail` | Validates, upserts user, stores order, returns `{ id, status }` |

### `createOrder` flow

1. Parse body with Zod (`orderSchema`).
2. Reject empty carts / bad quantities / invalid user fields with `400`.
3. Find or create `User` by email.
4. Create `Order` with `items[]` and `status: "created"`.
5. Respond `201` with `{ id, status }` — the contract the React client expects.

### `getOrdersByEmail` flow

1. Locate user by email.
2. Return lean order documents with normalized `id` fields.
3. Used for verification/demo and tests.

## Data models

| File | What it does | Key symbols | Why / impact |
|---|---|---|---|
| `src/models/user.model.ts` | Mongoose user schema | `firstName`, `lastName`, `email` (unique), `address` | Stores checkout identity details |
| `src/models/order.model.ts` | Mongoose order schema | `user` ObjectId, `items[]` with numeric `quantity`, `status` | Persists the assignment’s order document |

### Why quantity is `Number`

Earlier schema mistakes stored quantity as a string. Numeric `min/max` validation is required so “change quantity” from the UI is stored correctly and safely.

## Validation and types

| File | What it does | Key symbols | Why / impact |
|---|---|---|---|
| `src/validation/order.schema.ts` | Zod request schema | `orderSchema`, `OrderPayload` | Server-side enforcement beyond React validation |
| `src/types/index.ts` | Shared TS interfaces | `Item`, `UserInput` | Typing for controllers/tests |

## Tests

| File | What it does | Key symbols | Why / impact |
|---|---|---|---|
| `src/validation/order.schema.test.ts` | Schema unit tests | valid order, empty cart, qty 0, bad email | Fast feedback on validation rules |
| `src/orders.integration.test.ts` | API tests with MongoMemoryServer | create order, reject invalid, health | Proves persistence and contract without Docker Mongo |

## How the orders service fits the assignment

1. Screen 2 submits customer fields + selected products.
2. Node validates and stores both user details and the items array in MongoDB.
3. Client shows success only when a real `id` comes back.
4. Health endpoints keep Docker Compose and ops checks honest.
