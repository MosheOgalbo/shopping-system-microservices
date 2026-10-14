export interface CatalogProduct {
  Id: number;
  Name: string;
  Price: number;
}

export interface RequestedItem {
  productId: string;
  name: string;
  quantity: number;
  price?: number;
}

export interface AuthorizedItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

const catalogCache = new Map<string, { expiresAt: number; products: CatalogProduct[] }>();
const CATALOG_CACHE_MS = 15_000;

export async function fetchCatalogProducts(catalogBaseUrl: string): Promise<CatalogProduct[]> {
  const url = `${catalogBaseUrl.replace(/\/$/, '')}/Products`;
  const cached = catalogCache.get(url);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.products;
  }

  const response = await fetch(url, { signal: AbortSignal.timeout(5_000) });
  if (!response.ok) {
    throw new Error(`Catalog request failed with status ${response.status}`);
  }

  const products = await response.json() as CatalogProduct[];
  if (!Array.isArray(products)) {
    throw new Error('Catalog response is invalid');
  }

  catalogCache.set(url, { expiresAt: Date.now() + CATALOG_CACHE_MS, products });
  return products;
}

export function authorizeOrderItems(
  requestedItems: RequestedItem[],
  catalogProducts: CatalogProduct[],
): AuthorizedItem[] {
  const byId = new Map(catalogProducts.map(product => [String(product.Id), product]));

  return requestedItems.map(item => {
    const product = byId.get(item.productId);
    if (!product) {
      throw new Error(`Unknown productId: ${item.productId}`);
    }

    return {
      productId: String(product.Id),
      name: product.Name,
      quantity: item.quantity,
      price: Number(product.Price),
    };
  });
}
