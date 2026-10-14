import { describe, expect, it } from 'vitest';
import cartReducer, { addToCart, updateQuantity, clearCart } from './cartSlice';
import { Product } from '../../types';

const shirt: Product = {
  id: '3',
  name: 'חולצה כחולה',
  category: 'ביגוד',
  price: 89.99,
};

describe('cartSlice', () => {
  it('adds a product with the selected quantity', () => {
    const state = cartReducer(undefined, addToCart({ product: shirt, quantity: 3 }));
    expect(state.items).toEqual([{ ...shirt, quantity: 3 }]);
  });

  it('increases the quantity when the same product is added again', () => {
    const once = cartReducer(undefined, addToCart({ product: shirt, quantity: 2 }));
    const twice = cartReducer(once, addToCart({ product: shirt, quantity: 1 }));
    expect(twice.items[0].quantity).toBe(3);
  });

  it('removes a product when the quantity drops to zero', () => {
    const withItem = cartReducer(undefined, addToCart({ product: shirt, quantity: 1 }));
    const emptied = cartReducer(withItem, updateQuantity({ id: shirt.id, quantity: 0 }));
    expect(emptied.items).toHaveLength(0);
  });

  it('clears the cart', () => {
    const withItem = cartReducer(undefined, addToCart({ product: shirt, quantity: 1 }));
    expect(cartReducer(withItem, clearCart()).items).toHaveLength(0);
  });
});
