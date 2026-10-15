import { beforeEach, describe, expect, it } from 'vitest';
import { CART_STORAGE_KEY, emptyCart, loadCart, saveCart } from './persistCart';

describe('persistCart', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns an empty cart when nothing is stored', () => {
    expect(loadCart()).toEqual(emptyCart());
  });

  it('round-trips cart items', () => {
    saveCart({
      items: [{
        id: '3',
        name: 'חולצה כחולה',
        category: 'ביגוד',
        price: 89.99,
        quantity: 2,
      }],
    });

    expect(loadCart().items).toEqual([{
      id: '3',
      name: 'חולצה כחולה',
      category: 'ביגוד',
      price: 89.99,
      quantity: 2,
    }]);
    expect(window.localStorage.getItem(CART_STORAGE_KEY)).toContain('חולצה כחולה');
  });

  it('rewrites leftover local SVG catalog paths to JPEG', () => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({
      items: [{
        id: '3',
        name: 'חולצה כחולה',
        category: 'ביגוד',
        price: 89.99,
        quantity: 1,
        image: '/catalog/shirt.svg',
      }],
    }));

    expect(loadCart().items[0]?.image).toBe('/catalog/shirt.jpg');
  });
});
