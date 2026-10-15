import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { CartUiProvider } from '../cartUi/CartUiProvider';
import { store } from '../store';
import { addToCart, clearCart } from '../store/slices/cartSlice';
import Header from './Header';

function renderHeader() {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <CartUiProvider>
          <Header />
        </CartUiProvider>
      </MemoryRouter>
    </Provider>,
  );
}

describe('Header', () => {
  beforeEach(() => {
    store.dispatch(clearCart());
  });

  it('hides a zero badge and opens a cart summary from the icon', async () => {
    const user = userEvent.setup();
    renderHeader();

    const cartButton = screen.getByRole('button', { name: 'עגלת קניות - 0 פריטים' });
    expect(cartButton.querySelector('[data-testid="cart-badge"]')).toBeNull();

    expect(screen.queryByRole('link', { name: 'המשך הזמנה' })).not.toBeInTheDocument();

    await user.click(cartButton);

    const summary = screen.getByRole('dialog', { name: 'סיכום עגלה' });
    expect(summary).toHaveTextContent('0 פריטים');
    expect(summary).toHaveTextContent('₪0.00');
  });

  it('shows the item count on the cart icon and opens the side menu', async () => {
    store.dispatch(addToCart({
      product: { id: '3', name: 'חולצה כחולה', category: 'ביגוד', price: 89.99 },
      quantity: 2,
    }));
    const user = userEvent.setup();
    renderHeader();

    const cartButton = screen.getByRole('button', { name: 'עגלת קניות - 2 פריטים' });
    expect(cartButton.querySelector('[data-testid="cart-badge"]')).toHaveTextContent('2');
    expect(screen.getByRole('link', { name: 'המשך הזמנה' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'פתיחת תפריט' }));
    const menu = screen.getByRole('dialog', { name: 'תפריט' });
    const checkout = within(menu).getByRole('button', { name: 'המשך הזמנה' });
    const shop = within(menu).getByRole('link', { name: 'קניות' });
    expect(within(menu).getByRole('heading', { name: 'הסל שלי' })).toBeInTheDocument();
    expect(checkout.compareDocumentPosition(shop) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
