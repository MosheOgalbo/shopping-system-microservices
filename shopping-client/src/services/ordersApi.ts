import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CartItem } from '../store/types';
import { API_ENDPOINTS } from '../util/constants';
import { OrderRequest } from './types';

export interface PlaceOrderResponse {
  id: string;
  status: string;
}

const transformCartItemsToOrderItems = (cartItems: CartItem[]) => {
  return cartItems.map(item => ({
    productId: item.id,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
  }));
};

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
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    placeOrder: builder.mutation<PlaceOrderResponse, { user: OrderRequest['user']; items: CartItem[] }>({
      query: (orderData) => ({
        url: 'orders/',
        method: 'POST',
        body: {
          user: orderData.user,
          items: transformCartItemsToOrderItems(orderData.items),
        } satisfies OrderRequest,
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const { usePlaceOrderMutation } = ordersApi;
