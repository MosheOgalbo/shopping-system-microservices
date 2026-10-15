import React, { useEffect, useId, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { store } from './store';
import { useAppSelector } from './hooks';
import { CartUiProvider, useCartUi } from './cartUi';
import ShoppingScreen from './pages/ShoppingScreen';
import OrderScreen from './pages/OrderScreen';
import CartPanel from './components/CartPanel';
import SideDrawer from './components/SideDrawer';
import DocumentDirection from './components/DocumentDirection';
import './App.css';
import './i18n';

function OrderRoute() {
  const items = useAppSelector(state => state.cart.items);
  const enteredWithItems = useRef(items.length > 0);

  if (!enteredWithItems.current) {
    return <Navigate to="/shopping" replace />;
  }

  return <OrderScreen />;
}

function useIsMobile() {
  const query = '(max-width: 767px)';
  const [isMobile, setIsMobile] = useState(() => {
    const media = typeof window !== 'undefined' ? window.matchMedia?.(query) : undefined;
    return Boolean(media?.matches);
  });

  useEffect(() => {
    const media = window.matchMedia?.(query);
    if (!media) return undefined;
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return isMobile;
}

function CartDrawerHost() {
  const { t } = useTranslation();
  const drawerId = useId();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { cartDrawerOpen, closeCartDrawer } = useCartUi();

  useEffect(() => {
    if (!isMobile) closeCartDrawer();
  }, [isMobile, closeCartDrawer]);

  useEffect(() => {
    closeCartDrawer();
  }, [location.pathname, closeCartDrawer]);

  if (!isMobile) return null;

  return (
    <SideDrawer
      id={drawerId}
      open={cartDrawerOpen}
      title={t('cart.title')}
      edge="start"
      onClose={closeCartDrawer}
    >
      <CartPanel variant="drawer" />
    </SideDrawer>
  );
}

function AppShell() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-emerald-700 focus:px-4 focus:py-2 focus:text-white"
      >
        {t('a11y.skipToContent')}
      </a>
      <DocumentDirection />
      <Routes>
        <Route path="/" element={<Navigate to="/shopping" />} />
        <Route path="/shopping" element={<ShoppingScreen />} />
        <Route path="/order" element={<OrderRoute />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <CartUiProvider>
          <AppShell />
          <CartDrawerHost />
        </CartUiProvider>
      </Router>
    </Provider>
  );
}

export default App;
