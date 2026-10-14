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

export async function fetchCatalogProducts(catalogBaseUrl: string): Promise<CatalogProduct[]> {
  const url = `${catalogBaseUrl.replace(/\/$/, '')}/Products`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Catalog request failed with status ${response.status}`);
  }

  const products = await response.json() as CatalogProduct[];
  if (!Array.isArray(products)) {
    throw new Error('Catalog response is invalid');
  }

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
