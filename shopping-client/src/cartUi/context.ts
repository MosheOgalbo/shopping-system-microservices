import { createContext } from 'react';

export type CartUiValue = {
  cartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
};

export const CartUiContext = createContext<CartUiValue | null>(null);
