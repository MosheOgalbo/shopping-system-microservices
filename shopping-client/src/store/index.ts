import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import { ordersApi } from '../services/ordersApi';
import { catalogApi } from '../services/catalogApi';
import { loadCart, saveCart } from './persistCart';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [catalogApi.reducerPath]: catalogApi.reducer,
  },
  preloadedState: {
    cart: loadCart(),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ordersApi.middleware,
      catalogApi.middleware
    ),
});

store.subscribe(() => {
  saveCart(store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
