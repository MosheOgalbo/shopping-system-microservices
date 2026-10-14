import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { store } from '../store';
import { clearCart } from '../store/slices/cartSlice';
import ProductCard from './ProductCard';

const product = {
  id: '3',
  name: 'חולצה כחולה',
  category: 'ביגוד',
  price: 89.99,
  description: 'חולצת כותנה',
  image: '👕',
};

describe('ProductCard', () => {
  it('adds the chosen quantity to the cart', async () => {
    store.dispatch(clearCart());
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <ProductCard product={product} />
      </Provider>
    );

    await user.click(screen.getByRole('button', { name: 'הגדל כמות של חולצה כחולה' }));
    await user.click(screen.getByRole('button', { name: 'הגדל כמות של חולצה כחולה' }));
    await user.click(screen.getByRole('button', { name: 'הוסף מוצר לסל: חולצה כחולה' }));

    expect(store.getState().cart.items).toEqual([
      expect.objectContaining({ id: '3', name: 'חולצה כחולה', quantity: 3 }),
    ]);
  });
});
