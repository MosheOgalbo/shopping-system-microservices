# Quality Assessment

This document answers the quality questions for the shopping assignment: React version and hooks, backend library currency, and how professionally the assignment is presented.

## React frontend: is it 19+?

**Yes.** The client uses:

| Package | Declared version | Role |
|---|---|---|
| `react` | `^19.1.0` | UI runtime |
| `react-dom` | `^19.1.0` | DOM rendering |
| `@types/react` | `^19.1.8` | TypeScript types |
| `vite` | `^7.0.0` | Build tool |
| `@reduxjs/toolkit` | `^2.8.2` | State + RTK Query |
| `react-router-dom` | `^7.6.3` | Client routing |

## Are the hooks modern and professional?

**Yes for this product shape.** The app uses the hooks that matter for a catalog + cart + order flow:

| Hook / pattern | Where | Why it is the right choice |
|---|---|---|
| `useState` | forms, quantity, UI flags | Local interactive state |
| `useEffect` | success modal auto-close | Timed side effects |
| `useMemo` | product list transform | Avoid re-mapping API data every render |
| `useAppDispatch` / `useAppSelector` | typed Redux hooks | Type-safe store access (Redux Toolkit best practice) |
| `useGetProductsQuery` / `useGetCategoriesQuery` | RTK Query | Cached server state, loading/error flags, `skip` for category filtering |
| `usePlaceOrderMutation` | order submit | Mutation lifecycle without hand-rolled `fetch` |

What this stack intentionally does **not** overuse:

- `useOptimistic` / `useActionState` — reserved for React Server Actions / form-action apps; this SPA posts to Express and waits for a real order id.
- Heavy `useCallback` / `useMemo` everywhere — not needed with the current component size; RTK Query already owns server cache.

Overall: the data-fetching model (RTK Query) is more production-appropriate than fetching inside `useEffect` and stuffing results into Redux.

## Backend libraries: current and production-ready?

### Catalog API (`.NET`)

| Item | Version | Assessment |
|---|---|---|
| Target framework | `net10.0` | Matches the assignment requirement |
| EF Core SQL Server | `10.0.13` | Current EF Core line for .NET 10 |
| Swashbuckle | `10.0.1` | Compatible OpenAPI stack |
| SQL Server image | `2022-latest` | Standard production engine for the assignment |

This is appropriate for production-style homework and interviews: layered API / Core / Infrastructure, repositories, migrations, health endpoint, and automated tests.

### Orders API (Node)

| Item | Version | Assessment |
|---|---|---|
| Node (Docker) | `22-alpine` | Current LTS line |
| Express | `^5.1.0` | Current major |
| Mongoose | `^8.16.1` | Current MongoDB ODM line |
| Zod | `^4.6.7` | Request validation at the edge |
| TypeScript | `^5.8.3` | Typed Node service |

Also production-minded: connect Mongo before listen, health endpoints, reject invalid carts, return a real `{ id, status }` contract, and no fake success path in the client.

### Minor cleanup notes (not blockers)

- Client still lists some unused packages (`formik`, `yup`, `@mui/*`, `axios`) left from earlier scaffolding. They do not power the current screens.
- Node still depends on `body-parser` while `express.json()` is already used; harmless but removable.

## Is the assignment presented professionally?

**Yes, for a senior homework submission**, when judged by:

1. **Requirement fit** — React + Redux Toolkit, .NET 10 + SQL Server + EF, Node/Express + MongoDB.
2. **Clear separation** — one repo, three services, database-per-service.
3. **Honest business flow** — cart → checkout → persist order; failure does not look like success.
4. **Runnable demo** — `docker compose up --build` starts UI, both APIs, and both databases.
5. **Tests + CI** — unit/integration coverage across all three parts and a GitHub Actions workflow.
6. **Documentation** — root README for humans, structure/quality/agents docs for reviewers and AI tools, per-service file guides.

Suggested reviewer narrative: this is a focused microservices demo with Hebrew/English/Arabic i18n (RTL/LTR), basic accessibility (labels, live regions, dialog, skip link), and a clean shopping UX — not an overbuilt platform. That is the right level for this assignment.

## Verdict

| Question | Answer |
|---|---|
| React 19+? | Yes (`19.1.0`) |
| Modern professional hooks? | Yes — typed Redux hooks + RTK Query + local `useState`/`useMemo` where appropriate |
| Backend on current production libraries? | Yes — .NET 10 / EF Core 10 / Express 5 / Mongoose 8 / Zod 4 / Node 22 |
| Professional assignment presentation? | Yes — matches the brief, runs cleanly, tested, documented |
| E2E coverage? | Yes — Playwright covers checkout success, API failure, catalog price authority |
