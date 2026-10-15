import { useContext } from 'react';
import { CartUiContext } from './context';

export function useCartUi() {
  const value = useContext(CartUiContext);
  if (!value) {
    throw new Error('useCartUi must be used within CartUiProvider');
  }
  return value;
}
