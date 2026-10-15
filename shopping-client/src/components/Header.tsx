import React, { useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../hooks';
import { useCartUi } from '../cartUi';
import { ROUTES_Header } from '../util/constants';
import BrandLogo from './BrandLogo';
import CartPanel from './CartPanel';
import LanguageSwitcher from './LanguageSwitcher';
import SideDrawer from './SideDrawer';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const menuId = useId();
  const popoverId = useId();
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const { openCartDrawer, closeCartDrawer } = useCartUi();
  const cartItems = useAppSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const canCheckout = cartItems.length > 0;
  const isOrderPage = location.pathname === ROUTES_Header.ORDER;

  useEffect(() => {
    setMenuOpen(false);
    setSummaryOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!summaryOpen) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSummaryOpen(false);
        cartButtonRef.current?.focus();
      }
    };
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (popoverRef.current?.contains(target) || cartButtonRef.current?.contains(target)) return;
      setSummaryOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [summaryOpen]);

  const linkClass = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      active
        ? 'bg-slate-900 text-white dark:bg-emerald-600'
        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
    }`;

  const openMenu = () => {
    setSummaryOpen(false);
    closeCartDrawer();
    setMenuOpen(true);
  };

  const showCartPanel = () => {
    cartButtonRef.current?.focus();
    setSummaryOpen(false);
    setMenuOpen(false);
    openCartDrawer();
  };

  return (
    <header className="relative z-30 border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
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
          {canCheckout && (
            <Link to={ROUTES_Header.ORDER} className={linkClass(isOrderPage)}>
              {t('header.order')}
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
          <div className="relative">
            <button
              ref={cartButtonRef}
              type="button"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
              aria-label={t('a11y.cartItems', { count: cartCount })}
              aria-expanded={summaryOpen}
              aria-controls={popoverId}
              aria-haspopup="dialog"
              aria-describedby={summaryOpen ? `${popoverId}-summary` : undefined}
              onClick={() => {
                setMenuOpen(false);
                setSummaryOpen(open => !open);
              }}
            >
              <ShoppingCart className="h-5 w-5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
              {cartCount > 0 && (
                <span
                  data-testid="cart-badge"
                  className="absolute -top-1.5 end-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-700 px-1 text-[11px] font-bold leading-none text-white"
                  aria-hidden="true"
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
            {summaryOpen && (
              <div
                ref={popoverRef}
                id={popoverId}
                role="dialog"
                aria-label={t('a11y.cartSummary')}
                className="absolute end-0 top-[calc(100%+0.7rem)] z-40 w-60 rounded-2xl border border-slate-200 bg-white p-4 text-start shadow-xl dark:border-slate-600 dark:bg-slate-900"
              >
                <span
                  className="absolute -top-1.5 end-4 h-3 w-3 rotate-45 border-s border-t border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-900"
                  aria-hidden="true"
                />
                <div id={`${popoverId}-summary`}>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {t('cart.items', { count: cartCount })}
                  </p>
                  <p className="mt-1 text-base font-bold text-emerald-800 dark:text-emerald-300">
                    {t('cart.total')} ₪{totalPrice.toFixed(2)}
                  </p>
                </div>
                <button
                  type="button"
                  className="mt-3 w-full rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white md:hidden dark:bg-emerald-600"
                  onClick={showCartPanel}
                >
                  {t('cart.openPanel')}
                </button>
              </div>
            )}
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 md:hidden dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-haspopup="dialog"
            aria-label={t('a11y.openMenu')}
            onClick={openMenu}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <SideDrawer
        id={menuId}
        open={menuOpen}
        title={t('a11y.menu')}
        edge="end"
        onClose={() => setMenuOpen(false)}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t('a11y.theme')}</span>
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t('a11y.language')}</span>
            <LanguageSwitcher id="language-switcher-menu" />
          </div>
          <CartPanel variant="drawer" />
          <nav className="grid gap-2" aria-label={t('a11y.mainNav')}>
            <Link
              to={ROUTES_Header.SHOPPING}
              className={`rounded-xl px-4 py-3 text-center text-sm font-semibold ${linkClass(!isOrderPage)}`}
              onClick={() => setMenuOpen(false)}
            >
              {t('header.shopping')}
            </Link>
          </nav>
        </div>
      </SideDrawer>
    </header>
  );
};

export default Header;
