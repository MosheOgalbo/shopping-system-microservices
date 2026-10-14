import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../hooks';
import { translateCatalogLabel } from '../i18n/catalog';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';

const CartPanel: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.cart.items);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <aside
      className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6 dark:border-slate-700 dark:bg-slate-900"
      aria-label={t('a11y.cartPanel')}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('cart.title')}</h2>
        <span
          className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
          data-testid="cart-count"
        >
          {t('cart.items', { count })}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="rounded-xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-300">
          {t('cart.empty')}
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map(item => {
            const displayName = translateCatalogLabel(t, 'names', item.name);
            return (
              <li key={item.id} className="rounded-xl border border-slate-100 p-3 dark:border-slate-700">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 text-start">
                    <p className="break-words font-semibold text-slate-900 dark:text-slate-50">{displayName}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">₪{item.price.toFixed(2)}</p>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 text-sm text-rose-700 dark:text-rose-400"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    {t('cart.remove')}
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={t('a11y.decreaseCartQty', { name: displayName })}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 dark:border-slate-500 dark:text-slate-100"
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                    >
                      −
                    </button>
                    <span className="min-w-5 text-center text-sm font-semibold dark:text-slate-100">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label={t('a11y.increaseCartQty', { name: displayName })}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-500 dark:text-slate-100"
                      disabled={item.quantity >= 99}
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                    >
                      +
                    </button>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-slate-50">
                    ₪{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-700">
        <div className="mb-4 flex items-center justify-between text-lg font-bold text-slate-900 dark:text-white">
          <span>{t('cart.total')}</span>
          <span>₪{total.toFixed(2)}</span>
        </div>
        <button
          type="button"
          disabled={items.length === 0}
          onClick={() => navigate('/order')}
          className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300 dark:bg-emerald-600 dark:disabled:bg-slate-700"
        >
          {t('cart.checkout')}
        </button>
      </div>
    </aside>
  );
};

export default CartPanel;
