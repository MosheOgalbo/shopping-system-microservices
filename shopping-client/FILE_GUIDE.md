# shopping-client — File Guide

English map of every important frontend file: purpose, key functions/exports, why it exists, and project impact.

## Root / config

| File | What it does | Key symbols | Why / impact |
|---|---|---|---|
| `package.json` | Dependencies and scripts (`dev`, `build`, `test`) | React 19, RTK, Vite, Vitest | Defines the client runtime and toolchain |
| `package-lock.json` | Locked dependency tree | — | Reproducible installs in Docker/CI |
| `Dockerfile` | Builds static assets and serves them | build args `VITE_API_*` | Production UI image used by Compose |
| `.dockerignore` | Excludes `node_modules`/`dist` from image context | — | Faster, cleaner builds |
| `vite.config.js` | Vite + React + Tailwind + Vitest config | `defineConfig`, `test.setupFiles` | Dev server, production bundle, test runner |
| `tsconfig.json` | TypeScript compiler options | `strict`, `jsx: react-jsx` | Type safety across `.ts`/`.tsx` |
| `tailwind.config.js` | Tailwind theme hooks (v4 mostly CSS-driven) | — | Styling system entry |
| `eslint.config.js` | Lint rules | — | Catches hook/rule mistakes |
| `index.html` | SPA shell, Hebrew `lang`/`dir`, Rubik font | `#root` | Browser entry document |
| `README.md` | Vite template notes (legacy) | — | Prefer root docs for product guidance |
| `FILE_GUIDE.md` | This file | — | AI/human navigation |

## Entry and app shell

| File | What it does | Key symbols | Why / impact |
|---|---|---|---|
| `src/main.tsx` | Mounts React into `#root` | `ReactDOM.createRoot` | Bootstraps the SPA (store is provided inside `App`) |
| `src/App.jsx` | Redux `Provider`, router, RTL wrapper, routes | `BrowserRouter`, `/shopping`, `/order` | Owns navigation between the two required screens |
| `src/App.css` | Minimal root width helper | `#root` | Keeps layout full-width |
| `src/index.css` | Tailwind import + global typography/RTL body styles | `@import "tailwindcss"` | Visual baseline for a clean Hebrew UI |
| `src/vite-env.d.ts` | Typed `import.meta.env` for API URLs | `VITE_API_PRODUCTS`, `VITE_API_ORDERS` | Compile-time env typing |

## Pages (route screens)

| File | What it does | Key symbols | Why / impact |
|---|---|---|---|
| `src/pages/ShoppingScreen.tsx` | Screen 1: catalog, filters, cart panel | `useGetProductsQuery`, `useGetCategoriesQuery`, `useMemo`, category `skip` | Implements “load categories/products on open”, filter, quantity/add via cards |
| `src/pages/OrderScreen.tsx` | Screen 2: checkout form + summary | `usePlaceOrderMutation`, `clearCart`, success/error state | Sends order only after validation; clears cart only after real success |

## Components

| File | What it does | Key symbols | Why / impact |
|---|---|---|---|
| `Header.tsx` | Brand, nav links, cart totals | `useAppSelector`, route links | Persistent navigation and cart count |
| `CartPanel.tsx` | Side cart with qty controls and continue CTA | `updateQuantity`, `removeFromCart`, navigate `/order` | Makes cart visible on screen 1 (assignment UX) |
| `ProductCard.tsx` | Product image/details, qty stepper, add button | `useState`, `addToCart({ product, quantity })` | Core “choose product + quantity + add to cart” interaction |
| `ProductsGrid.tsx` | Responsive product grid / empty state | `renderProductsGrid`, `renderEmptyState` | Layout for catalog results |
| `FilterBar.tsx` | Category select + sort select | `onCategoryChange`, `onSortChange` | Category filtering required by the brief |
| `SearchInput.tsx` | Controlled search field | `value`/`onChange` | Client-side product search |
| `ResultsInfo.tsx` | “N products found” summary | `count`, `searchTerm`, `category` | Feedback after filter/search |
| `OrderForm.tsx` | Required customer fields + validation | `validate`, `handleSubmit` | Enforces name/address/email before submit |
| `FormField.tsx` | Labeled input with error text | `htmlFor`, `aria-invalid` | Accessible form building block |
| `FormHeader.tsx` | “Personal details” heading | — | Visual section marker |
| `SubmitButton.tsx` | “Confirm order” / loading state | `isSubmitting` | Primary checkout action |
| `OrderSummary.tsx` | Selected products + total | `items`, `total` | Shows previous-screen cart on screen 2 |
| `RenderOrderItem.tsx` | One line item in the summary | image/icon + qty × price | Readable order list |
| `RenderEmptyCart.tsx` | Empty cart placeholder | — | Prevents blank summary state |
| `SuccessModal.tsx` | Success dialog + auto-return | `useEffect` timer, `orderId` | Confirms persistence with real id |

## Services (RTK Query)

| File | What it does | Key symbols | Why / impact |
|---|---|---|---|
| `services/productsApi.ts` | Catalog HTTP API | `getProducts`, `getProductsByCategory` | Source of truth for products from .NET |
| `services/categoriesApi.ts` | Categories HTTP API | `getCategories`, `transformResponse` | Loads category list for the filter |
| `services/ordersApi.ts` | Order mutation | `placeOrder`, maps cart → `{ productId, name, quantity, price }` | Only success path is a real API response |
| `services/types.ts` | Wire types for APIs | `BackendProduct`, `OrderRequest`, `Category` | Keeps client/server field names aligned |

## State management

| File | What it does | Key symbols | Why / impact |
|---|---|---|---|
| `store/index.ts` | Configures Redux store + middleware | `configureStore`, RTK Query middleware | Central app state |
| `store/types.ts` | Store domain types | `CartItem`, `Order`, `ProductsState` | Shared typing for slices |
| `store/slices/cartSlice.ts` | Cart mutations | `addToCart`, `updateQuantity`, `removeFromCart`, `clearCart` | Local cart required between the two screens |
| `store/slices/productsSlice.ts` | Legacy/local products slice | `setBackendProducts`, etc. | Kept for compatibility; shopping screen now prefers RTK Query data |
| `store/slices/orderSlice.ts` | Optional order history state | `setCurrentOrder`, `addToOrderHistory` | Available for future order history UI |
| `features/products/productsSlice.ts` | Feature-folder product slice | `setBackendProducts`, `toProduct` | Alternate feature-oriented slice (historical structure) |
| `features/products/types.ts` | Feature product types | `Product`, `BackendProduct` | Types used by transformers/tests |

## Hooks, utils, types, tests

| File | What it does | Key symbols | Why / impact |
|---|---|---|---|
| `hooks/index.ts` | Typed Redux hooks | `useAppDispatch`, `useAppSelector` | Prevents untyped store access |
| `util/constants.ts` | API bases, routes, validation messages | `API_ENDPOINTS`, `VALIDATION_RULES` | Single place for URLs and copy |
| `util/products.ts` | Backend → UI product mapping | `toProduct`, `categoryIcon`, `isImageUrl` | Normalizes .NET PascalCase DTOs for React |
| `types/index.ts` | Shared UI/prop types | `FormData`, `PropsProductCard`, etc. | Component contract typing |
| `test/setup.ts` | Vitest + Testing Library cleanup | `afterEach(cleanup)` | Stable component tests |
| `util/products.test.ts` | Transformer tests | — | Guards image/url fallback behavior |
| `store/slices/cartSlice.test.ts` | Cart reducer tests | — | Guards quantity merge/clear rules |
| `components/OrderForm.test.tsx` | Form validation/submit tests | — | Guards required fields |
| `components/ProductCard.test.tsx` | Add-to-cart interaction test | — | Guards quantity → cart path |

## How the frontend pieces fit together

1. `App.jsx` routes to `ShoppingScreen` or `OrderScreen`.
2. Shopping screen queries .NET via RTK Query and renders cards + `CartPanel`.
3. Cards dispatch into `cartSlice`.
4. Order screen reads cart, validates form locally, mutates Node API.
5. On success, cart clears and the modal shows the server order id.
