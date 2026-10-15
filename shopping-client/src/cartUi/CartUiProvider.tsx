import React, { useCallback, useMemo, useState } from 'react';
import { CartUiContext, CartUiValue } from './context';

export function CartUiProvider({ children }: { children: React.ReactNode }) {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const openCartDrawer = useCallback(() => setCartDrawerOpen(true), []);
  const closeCartDrawer = useCallback(() => setCartDrawerOpen(false), []);
  const value = useMemo<CartUiValue>(() => ({
    cartDrawerOpen,
    openCartDrawer,
    closeCartDrawer,
  }), [cartDrawerOpen, openCartDrawer, closeCartDrawer]);

  return <CartUiContext.Provider value={value}>{children}</CartUiContext.Provider>;
}
