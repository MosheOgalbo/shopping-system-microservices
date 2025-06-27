import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
// import { api } from './middleware/api';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    cart: cartReducer,
    order: orderReducer,
    // [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(api.middleware),
       getDefaultMiddleware().concat(),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
