import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { store } from './store';
import ShoppingScreen from './pages/ShoppingScreen';
import OrderScreen from './pages/OrderScreen';
import DocumentDirection from './components/DocumentDirection';
import './App.css';
import './i18n';

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
        <Route path="/order" element={<OrderScreen />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppShell />
      </Router>
    </Provider>
  );
}

export default App;
