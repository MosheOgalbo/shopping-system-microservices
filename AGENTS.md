# Agent Guide (AI Tools)

Instructions for coding agents (Cursor, Claude, Copilot Chat, and similar tools) working in this repository.

## Mission

This repository is a homework / interview shopping system with three services:

1. `shopping-client` — React 19 + Redux Toolkit (Hebrew RTL UI)
2. `server-net` — .NET 10 + EF Core + SQL Server (categories & products)
3. `server-node` — Express + MongoDB (order persistence)

Preserve the assignment contract unless the user explicitly asks to change it.

## Read first

| File | Use when |
|---|---|
| `README.md` | How to run / test |
| `PROJECT_STRUCTURE.md` | Directory tree and service roles |
| `QUALITY.md` | Stack versions and quality rationale |
| `shopping-client/FILE_GUIDE.md` | Frontend file-by-file map |
| `server-net/FILE_GUIDE.md` | Catalog API file-by-file map |
| `server-node/FILE_GUIDE.md` | Orders API file-by-file map |

## Hard constraints

- Keep the catalog API on **.NET 10 + SQL Server + Entity Framework**.
- Keep the orders API on **Node + Express (or Nest) + NoSQL**. MongoDB is allowed.
- Keep the client on **React + Redux Toolkit**.
- Never restore mock/fallback “successful order” behavior when the API fails.
- Keep the API contract `{ id, status }` for created orders.
- Prefer Hebrew RTL UX for user-facing copy.
- Do not commit secrets. Compose passwords are local demo values only.

## Preferred change style

- Small, focused diffs that match existing patterns.
- Typed Redux hooks (`useAppDispatch` / `useAppSelector`) instead of raw `useDispatch` / `useSelector`.
- RTK Query for HTTP; avoid new ad-hoc `axios`/`fetch` wrappers unless necessary.
- Validate orders on the server with Zod (or equivalent), not only on the client.
- Update migrations when the EF model changes; do not edit old SQL Server migration history casually.
- Update tests when behavior changes.

## Commands

```bash
# Full stack
docker compose up --build

# Tests
cd server-net && dotnet test
cd server-node && npm test
cd shopping-client && npm test

# Local client build
cd shopping-client && npm run build
```

## Service ports

| Service | Port |
|---|---|
| Frontend | `5173` |
| Catalog API | `5177` |
| Orders API | `5001` |
| SQL Server | `1433` |
| MongoDB | `27017` |

## Safe defaults for agents

- If asked to “improve architecture,” prefer reliability, typing, tests, and docs over new frameworks.
- If asked to redesign UI, keep RTL, cart visibility, category filter, quantity control, and required checkout fields.
- If a dependency looks unused (`formik`, `yup`, MUI, `axios`, `body-parser`), remove it only when verifying no imports remain.
- When documenting, keep AI/docs markdown in **English** unless the user asks for Hebrew.

## Out of scope unless requested

- Authentication / JWT
- Payments
- Elasticsearch mapping (MongoDB satisfies the NoSQL requirement)
- Elasticsearch mapping beyond the homework MongoDB option (optional demos may still document AWS/K8s)
