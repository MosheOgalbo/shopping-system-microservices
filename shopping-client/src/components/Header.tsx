import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { ROUTES_Header, TEXTS_Header } from '../util/constants';

const Header: React.FC = () => {
  const location = useLocation();
  const cartItems = useAppSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const isOrderPage = location.pathname === ROUTES_Header.ORDER;

  const linkClass = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
    }`;

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to={ROUTES_Header.SHOPPING} className="flex items-center gap-3" aria-label="חזרה לעמוד הקניות">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-lg text-white">ס</span>
          <span className="text-right">
            <span className="block text-base font-bold text-slate-950">{TEXTS_Header.LOGO}</span>
            <span className="block text-xs text-slate-500">{TEXTS_Header.SUBTITLE}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <Link to={ROUTES_Header.SHOPPING} className={linkClass(!isOrderPage)}>
            {TEXTS_Header.SHOPPING}
          </Link>
          <Link to={ROUTES_Header.ORDER} className={linkClass(isOrderPage)}>
            {TEXTS_Header.ORDER}
          </Link>
        </nav>

        <Link
          to={ROUTES_Header.ORDER}
          className="flex items-center gap-3 rounded-full border border-slate-200 px-3 py-2"
          aria-label={`עגלת קניות - ${cartCount} פריטים`}
        >
          <span className="text-sm font-semibold text-slate-800">{cartCount} {TEXTS_Header.ITEMS}</span>
          <span className="text-sm font-bold text-emerald-800">₪{totalPrice.toFixed(2)}</span>
        </Link>
      </div>

      <nav className="grid grid-cols-2 border-t border-slate-200 md:hidden">
        <Link
          to={ROUTES_Header.SHOPPING}
          className={`py-3 text-center text-sm font-semibold ${!isOrderPage ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
        >
          {TEXTS_Header.SHOPPING}
        </Link>
        <Link
          to={ROUTES_Header.ORDER}
          className={`py-3 text-center text-sm font-semibold ${isOrderPage ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
        >
          {TEXTS_Header.ORDER}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
