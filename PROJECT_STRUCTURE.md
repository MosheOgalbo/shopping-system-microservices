# Project Structure

This document explains the repository tree, why the folders are ordered this way, and what each part does in the system.

## Request flow

```text
Browser (Hebrew RTL UI)
        │
        ▼
shopping-client ──GET──► server-net ──► SQL Server
 React 19 + RTK          .NET 10 + EF     categories + products
        │
        └──POST──► server-node ──► MongoDB
                   Express + Zod   user + order + items[]
```

## Root layout (top to bottom)

| Item | Why it is first / here | Role |
|---|---|---|
| `README.md` | Human entry point | Install, run, use, test |
| `PROJECT_STRUCTURE.md` | Architecture map | Tree + service responsibilities |
| `QUALITY.md` | Reviewer checklist | React 19, hooks, library currency, professionalism |
| `AGENTS.md` | AI-tool entry point | Constraints, commands, safe defaults |
| `docker-compose.yml` | Orchestration | Runs all services locally |
| `.github/workflows/` | CI | Builds and tests on push/PR |
| `.cursor/rules/` | Cursor AI rules | Persistent coding guidance |
| `shopping-client/` | UI service | Shopping screen + order screen |
| `server-net/` | Catalog API | Categories/products from SQL Server |
| `server-node/` | Orders API | Persists checkout payload in MongoDB |

The order mirrors the assignment: client first, then screen-1 server, then screen-2 server.

## Directory tree

```text
shopping-app/
├── README.md
├── PROJECT_STRUCTURE.md
├── QUALITY.md
├── AGENTS.md
├── docker-compose.yml
├── .github/workflows/tests.yml
├── .cursor/rules/
├── shopping-client/                 # React + Redux Toolkit
│   ├── FILE_GUIDE.md
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── pages/                   # Route-level screens
│       ├── components/              # Reusable UI
│       ├── services/                # RTK Query API slices
│       ├── store/                   # Redux store + slices
│       ├── features/                # Feature-oriented product slice
│       ├── hooks/                   # Typed Redux hooks
│       ├── util/                    # Constants + transformers
│       ├── types/                   # Shared TS types
│       └── test/                    # Vitest setup
├── server-net/                      # .NET 10 + EF Core + SQL Server
│   ├── FILE_GUIDE.md
│   ├── Dockerfile
│   ├── ShoppingApp.sln
│   ├── ShoppingApp.API/             # HTTP layer
│   ├── ShoppingApp.Core/            # Entities + DTOs
│   ├── ShoppingApp.Infrastructure/  # DbContext, repos, migrations
│   └── ShoppingApp.Tests/           # API tests
└── server-node/                     # Express + MongoDB
    ├── FILE_GUIDE.md
    ├── Dockerfile
    ├── package.json
    └── src/
        ├── controllers/
        ├── models/
        ├── routes/
        ├── validation/
        ├── config/
        └── types/
```

## What each service does

### 1. `shopping-client`

- Loads categories and products from `server-net` when the shopping page opens.
- Lets the user pick a category, change quantity, and add items to a Redux cart.
- Shows the cart on the same screen, then opens the order form via **Continue order**.
- Requires first name, last name, full address, and email.
- Posts to `server-node` and shows success only after a real order id returns.

File-by-file guide: [`shopping-client/FILE_GUIDE.md`](./shopping-client/FILE_GUIDE.md)

### 2. `server-net`

- ASP.NET Core on `.NET 10`.
- Entity Framework Core against SQL Server.
- Exposes categories/products endpoints used by screen 1.
- Applies migrations on startup and seeds demo catalog data.

File-by-file guide: [`server-net/FILE_GUIDE.md`](./server-net/FILE_GUIDE.md)

### 3. `server-node`

- Express + TypeScript + Mongoose.
- Validates order payloads with Zod.
- Creates/finds the user, stores the order with an items array, returns `{ id, status }`.

File-by-file guide: [`server-node/FILE_GUIDE.md`](./server-node/FILE_GUIDE.md)

## Why this separation

The assignment asks for three components. Each service owns its data store (database-per-service):

| Concern | Store | Reason |
|---|---|---|
| Tabular catalog | SQL Server | Relational categories ↔ products |
| Flexible checkout docs | MongoDB | User + items array as one order document |
| Cart UI state | Redux in the browser | Immediate UX without writing a cart service |

## Reading order for newcomers / AI tools

1. Run instructions → `README.md`
2. Tree and responsibilities → `PROJECT_STRUCTURE.md`
3. Stack quality answers → `QUALITY.md`
4. Agent constraints → `AGENTS.md`
5. Deep file maps → `*/FILE_GUIDE.md`
