import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';

const CartPanel: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.cart.items);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6" aria-label="סל הקניות">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">הסל שלי</h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700" data-testid="cart-count">
          {count} פריטים
        </span>
      </div>

      {items.length === 0 ? (
        <p className="rounded-xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
          עדיין אין מוצרים בסל. בחרו קטגוריה, כמות, והוסיפו מוצר.
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map(item => (
            <li key={item.id} className="rounded-xl border border-slate-100 p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">₪{item.price.toFixed(2)}</p>
                </div>
                <button
                  type="button"
                  className="text-sm text-rose-700"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  הסר
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`הקטן כמות בסל של ${item.name}`}
                    className="h-7 w-7 rounded-full border border-slate-300"
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                  >
                    −
                  </button>
                  <span className="min-w-5 text-center text-sm font-semibold">{item.quantity}</span>
                  <button
                    type="button"
                    aria-label={`הגדל כמות בסל של ${item.name}`}
                    className="h-7 w-7 rounded-full border border-slate-300"
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                  >
                    +
                  </button>
                </div>
                <span className="font-semibold text-slate-900">₪{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 border-t border-slate-200 pt-4">
        <div className="mb-4 flex items-center justify-between text-lg font-bold text-slate-900">
          <span>סה״כ</span>
          <span>₪{total.toFixed(2)}</span>
        </div>
        <button
          type="button"
          disabled={items.length === 0}
          onClick={() => navigate('/order')}
          className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          המשך הזמנה
        </button>
      </div>
    </aside>
  );
};

export default CartPanel;
