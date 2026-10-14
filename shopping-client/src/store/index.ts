import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import { ordersApi } from '../services/ordersApi';
import { productsApi } from '../services/productsApi';
import { categoriesApi } from '../services/categoriesApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ordersApi.middleware,
      productsApi.middleware,
      categoriesApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
