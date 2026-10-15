import { BackendProduct } from '../services/types';
import { Product } from '../types';

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
  return Boolean(
    image
    && (
      image.startsWith('http://')
      || image.startsWith('https://')
      || image.startsWith('data:')
      || image.startsWith('/')
    )
  );
}

export function toProduct(backendProduct: BackendProduct): Product {
  return {
    id: backendProduct.id.toString(),
    name: backendProduct.name,
    category: backendProduct.categoryName,
    price: backendProduct.price,
    description: backendProduct.description,
    image: isImageUrl(backendProduct.image) ? backendProduct.image : categoryIcon(backendProduct.categoryName),
  };
}
