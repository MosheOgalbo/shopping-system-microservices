import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product, CartState } from '../types';

const MAX_QUANTITY = 99;

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product: Product; quantity: number }>) {
      const quantity = Math.min(MAX_QUANTITY, Math.max(1, Math.floor(action.payload.quantity || 1)));
      const existing = state.items.find(item => item.id === action.payload.product.id);
      if (existing) {
        existing.quantity = Math.min(MAX_QUANTITY, existing.quantity + quantity);
      } else {
        state.items.push({ ...action.payload.product, quantity });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        } else {
          item.quantity = Math.min(MAX_QUANTITY, Math.floor(action.payload.quantity));
        }
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
