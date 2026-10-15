export interface CatalogProduct {
  id: number;
  name: string;
  price: number;
}

export interface RequestedItem {
  productId: string;
  quantity: number;
}

export interface AuthorizedItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

const catalogCache = new Map<string, { expiresAt: number; products: CatalogProduct[] }>();
const CATALOG_CACHE_MS = 15_000;

function catalogUrl(catalogBaseUrl: string, productIds: string[]): string {
  const uniqueIds = [...new Set(productIds)].join(',');
  return `${catalogBaseUrl.replace(/\/$/, '')}/Products?ids=${encodeURIComponent(uniqueIds)}`;
}

function asCatalogProduct(value: unknown): CatalogProduct | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const record = value as Record<string, unknown>;
  const id = Number(record.id ?? record.Id);
  const name = String(record.name ?? record.Name ?? '');
  const price = Number(record.price ?? record.Price);

  if (!Number.isFinite(id) || !name || !Number.isFinite(price)) {
    return null;
  }

  return { id, name, price };
}

export async function fetchCatalogProducts(
  catalogBaseUrl: string,
  productIds: string[],
): Promise<CatalogProduct[]> {
  const url = catalogUrl(catalogBaseUrl, productIds);
  const cached = catalogCache.get(url);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.products;
  }

  const response = await fetch(url, { signal: AbortSignal.timeout(5_000) });
  if (!response.ok) {
    throw new Error(`Catalog request failed with status ${response.status}`);
  }

  const payload = await response.json() as unknown;
  if (!Array.isArray(payload)) {
    throw new Error('Catalog response is invalid');
  }

  const products = payload.map(asCatalogProduct).filter((product): product is CatalogProduct => product !== null);
  catalogCache.set(url, { expiresAt: Date.now() + CATALOG_CACHE_MS, products });
  return products;
}

export function toCatalogPrice(value: number): number {
  return Math.round(Number(value) * 100) / 100;
}

export function authorizeOrderItems(
  requestedItems: RequestedItem[],
  catalogProducts: CatalogProduct[],
): AuthorizedItem[] {
  const byId = new Map(catalogProducts.map(product => [String(product.id), product]));

  return requestedItems.map(item => {
    const product = byId.get(item.productId);
    if (!product) {
      throw new Error(`Unknown productId: ${item.productId}`);
    }

    return {
      productId: String(product.id),
      name: product.name,
      quantity: item.quantity,
      price: toCatalogPrice(product.price),
    };
  });
}
