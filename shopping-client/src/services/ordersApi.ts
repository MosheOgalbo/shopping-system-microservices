import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Order } from '../store/slices/orderSlice';
import { CartItem } from '../store/slices/cartSlice';

interface OrderRequest {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
  };
  items: CartItem[];
}

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: (builder) => ({
    placeOrder: builder.mutation<Order, OrderRequest>({
      query: (order) => ({
        url: 'orders',
        method: 'POST',
        body: order,
        headers: {
          'Content-Type': 'application/json',
          accept: '*/*',
        },
      }),
    }),
  }),
});

export const { usePlaceOrderMutation } = ordersApi;
