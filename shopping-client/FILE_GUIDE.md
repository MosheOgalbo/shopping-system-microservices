# shopping-client

The browser application: catalog, cart, and checkout. It talks to the catalog API for products and to the orders API to save an order.

## Runtime

| File | Role |
|---|---|
| `Dockerfile` | Builds the static app. `VITE_API_PRODUCTS` and `VITE_API_ORDERS` are baked in at build time |
| `index.html` | Document shell, tab title, favicon, theme bootstrap before React loads |
| `public/favicon.svg` | Browser-tab icon |
| `src/main.tsx` | Mounts the app |
| `src/App.tsx` | Router for `/shopping` and `/order`, skip link |
| `src/index.css` | Tailwind, RTL/LTR text alignment, dark palette, focus and reduced-motion rules |

Compose points the APIs at `localhost`. Kubernetes and AWS builds use `/api/` so Ingress can route one host.

## Screens

| File | Role |
|---|---|
| `src/pages/ShoppingScreen.tsx` | Loads categories and products, applies search/sort/category, renders the grid and cart |
| `src/pages/OrderScreen.tsx` | Checkout form, order summary, error banner, success only after `{ id, status }` |

## UI modules

| File | Role |
|---|---|
| `components/Header.tsx` | Brand, navigation, language, and theme. The wide-layout checkout link appears only when the cart has items. Small screens open a side drawer: theme, language, cart card, then shopping. The cart icon shows a count badge and a summary popover |
| `components/BrandLogo.tsx` | Header mark |
| `components/LanguageSwitcher.tsx` | Language control; closed state shows `ע` / `E` / `ع` |
| `components/ThemeToggle.tsx` | Light / dark |
| `components/DocumentDirection.tsx` | Sets `html lang`, `dir`, and document title |
| `components/SearchInput.tsx` | Search combobox and product table |
| `components/FilterBar.tsx` | Category and sort |
| `components/ProductCard.tsx` | Quantity and add to cart |
| `components/ProductsGrid.tsx` | Result grid |
| `components/CartPanel.tsx` | Cart lines and checkout. Beside the products from the `md` breakpoint, and inside a side drawer on smaller screens |
| `components/SideDrawer.tsx` | Accessible side dialog used by the menu and the mobile cart |
| `components/OrderForm.tsx` | Required name, address, and email |
| `components/OrderSummary.tsx` | Lines chosen on the previous screen |
| `components/SuccessModal.tsx` | Dialog after a saved order id |

## Language, theme, and HTTP

| Path | Role |
|---|---|
| `src/i18n/index.ts` | i18next setup, persisted language, RTL list |
| `src/i18n/locales/*.json` | Hebrew, English, Arabic copy and catalog labels |
| `src/i18n/catalog.ts` | Translates seeded category, name, and description strings |
| `src/theme/index.ts` | Theme persistence and `dark` class |
| `services/productsApi.ts` | `GET Products` and `GET Products/category/{id}` |
| `services/categoriesApi.ts` | `GET Categories` |
| `services/ordersApi.ts` | `POST orders` with cart lines |
| `store/slices/cartSlice.ts` | Add, change quantity, remove, clear |
| `util/products.ts` | Maps PascalCase catalog DTOs to UI products |
| `util/constants.ts` | API base URLs and validation lengths |

## Tests

| File | Proves |
|---|---|
| `components/ProductCard.test.tsx` | Chosen quantity is what enters the cart |
| `components/OrderForm.test.tsx` | Empty required fields block submit |
| `store/slices/cartSlice.test.ts` | Cart merge and clear rules |
| `util/products.test.ts` | Catalog DTO mapping |
