import { BackendProduct, Product } from '../features/products/types';

const categoryIcons: Record<string, string> = {
  'אלקטרוניקה': '📱',
  'ביגוד': '👕',
  'ספרים': '📚',
  'ספורט': '⚽',
  'בית': '🏠',
  'צעצועים': '🧸',
  'מזון': '🍎',
  'יופי': '💄',
};

export function categoryIcon(category: string): string {
  for (const [key, icon] of Object.entries(categoryIcons)) {
    if (category?.includes(key)) {
      return icon;
    }
  }
  return '📦';
}

export function isImageUrl(image?: string): boolean {
  return Boolean(image && (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:')));
}

export function toProduct(backendProduct: BackendProduct): Product {
  return {
    id: backendProduct.Id.toString(),
    name: backendProduct.Name,
    nameEn: backendProduct.Name.toLowerCase().replace(/\s+/g, '-'),
    category: backendProduct.CategoryName,
    price: backendProduct.Price,
    description: backendProduct.Description,
    image: isImageUrl(backendProduct.Image) ? backendProduct.Image : categoryIcon(backendProduct.CategoryName),
  };
}
