# E2E tests (Playwright)

These tests exercise the full stack against a running Docker Compose environment.

## Prerequisites

```bash
# from repository root
docker compose up --build -d
```

Services expected:

- UI: http://localhost:5173
- Catalog API: http://localhost:5177
- Orders API: http://localhost:5001

## Run

```bash
cd e2e
npm ci
npx playwright install chromium
npm test
```

## Coverage

1. Catalog load → category filter → quantity → add to cart → checkout → real order id → cart cleared
2. Orders API failure → error shown, cart retained, no fake success
3. API: catalog overwrites tampered client prices
4. API: unknown product rejected
5. API: order lookup by email is not exposed
