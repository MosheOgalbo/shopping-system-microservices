import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../hooks';
import { ROUTES_Header } from '../util/constants';
import BrandLogo from './BrandLogo';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const cartItems = useAppSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const isOrderPage = location.pathname === ROUTES_Header.ORDER;

  const linkClass = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      active
        ? 'bg-slate-900 text-white dark:bg-emerald-600'
        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
    }`;

  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          to={ROUTES_Header.SHOPPING}
          className="flex min-w-0 items-center gap-3"
          aria-label={t('a11y.backToShopping')}
        >
          <BrandLogo className="h-10 w-10 shrink-0" />
          <span className="min-w-0 text-start">
            <span className="block truncate text-base font-bold text-slate-950 dark:text-white">
              {t('header.logo')}
            </span>
            <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
              {t('header.subtitle')}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label={t('a11y.mainNav')}>
          <Link to={ROUTES_Header.SHOPPING} className={linkClass(!isOrderPage)}>
            {t('header.shopping')}
          </Link>
          <Link to={ROUTES_Header.ORDER} className={linkClass(isOrderPage)}>
            {t('header.order')}
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
          <Link
            to={ROUTES_Header.ORDER}
            className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 dark:border-slate-600 dark:bg-slate-800"
            aria-label={t('a11y.cartItems', { count: cartCount })}
          >
            <ShoppingCart className="h-4 w-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              {cartCount} {t('header.items')}
            </span>
            <span className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
              ₪{totalPrice.toFixed(2)}
            </span>
          </Link>
        </div>
      </div>

      <nav
        className="grid grid-cols-2 border-t border-slate-200 md:hidden dark:border-slate-700"
        aria-label={t('a11y.mainNav')}
      >
        <Link
          to={ROUTES_Header.SHOPPING}
          className={`py-3 text-center text-sm font-semibold ${
            !isOrderPage
              ? 'bg-slate-900 text-white dark:bg-emerald-700'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          {t('header.shopping')}
        </Link>
        <Link
          to={ROUTES_Header.ORDER}
          className={`py-3 text-center text-sm font-semibold ${
            isOrderPage
              ? 'bg-slate-900 text-white dark:bg-emerald-700'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          {t('header.order')}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
