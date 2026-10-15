import { CartState } from './types';

export const CART_STORAGE_KEY = 'shopping-app-cart';

export function emptyCart(): CartState {
  return { items: [] };
}

export function loadCart(): CartState {
  if (typeof window === 'undefined') {
    return emptyCart();
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return emptyCart();
    }

    const parsed = JSON.parse(raw) as { items?: CartState['items'] };
    if (!Array.isArray(parsed.items)) {
      return emptyCart();
    }

    return {
      items: parsed.items.filter(item =>
        item
        && typeof item.id === 'string'
        && typeof item.name === 'string'
        && typeof item.price === 'number'
        && typeof item.quantity === 'number'
        && item.quantity > 0
      ).map(item => ({
        ...item,
        image: item.image?.replace(/^\/catalog\/(.+)\.svg$/, '/catalog/$1.jpg') ?? item.image,
      })),
    };
  } catch {
    return emptyCart();
  }
}

export function saveCart(cart: CartState) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items: cart.items }));
}
