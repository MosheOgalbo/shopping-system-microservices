import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type CartUiValue = {
  cartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
};

const CartUiContext = createContext<CartUiValue | null>(null);

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

export function useCartUi() {
  const value = useContext(CartUiContext);
  if (!value) {
    throw new Error('useCartUi must be used within CartUiProvider');
  }
  return value;
}
