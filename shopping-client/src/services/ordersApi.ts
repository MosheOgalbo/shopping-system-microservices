import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CartItem } from '../types';
import { API_ENDPOINTS } from '../util/constants';
import { OrderRequest } from './types';

export interface PlaceOrderResponse {
  id: string;
  status: string;
}

const transformCartItemsToOrderItems = (cartItems: CartItem[]) =>
  cartItems.map(item => ({
    productId: item.id,
    quantity: item.quantity,
  }));

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ENDPOINTS.ORDERS,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    placeOrder: builder.mutation<PlaceOrderResponse, { user: OrderRequest['user']; items: CartItem[] }>({
      query: (orderData) => ({
        url: 'orders/',
        method: 'POST',
        headers: {
          'Idempotency-Key': crypto.randomUUID(),
        },
        body: {
          user: orderData.user,
          items: transformCartItemsToOrderItems(orderData.items),
        } satisfies OrderRequest,
      }),
    }),
  }),
});

export const { usePlaceOrderMutation } = ordersApi;
