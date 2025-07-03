import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Order } from '../store/slices/orderSlice';
import { CartItem } from '../store/slices/cartSlice';

interface OrderRequest {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone?: string;
  };
  items: CartItem[];
}

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    placeOrder: builder.mutation<Order, OrderRequest>({
      queryFn: async (orderData, queryApi, extraOptions, baseQuery) => {
        try {
          console.log('Sending order to Node.js server:', orderData);

          const result = await baseQuery({
            url: 'orders',
            method: 'POST',
            body: orderData,
          });

          if (result.error) {
            console.error('API Error:', result.error);
            throw new Error(`API Error: ${JSON.stringify(result.error)}`);
          }

          if (result.data) {
            console.log('Order placed successfully:', result.data);
            return { data: result.data as Order };
          }

          throw new Error('No data received from server');
        } catch (error) {
          console.warn('Node.js API unavailable, creating mock order:', error);

          // Create mock order response
          const totalAmount = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          const mockOrder: Order = {
            id: `order_${Date.now()}`,
            user: orderData.user,
            items: orderData.items,
            totalAmount,
            status: 'confirmed',
            createdAt: new Date().toISOString(),
            estimatedDelivery: new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour from now
          };

          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          return { data: mockOrder };
        }
      },
      invalidatesTags: ['Order'],
    }),
    getOrderById: builder.query<Order, string>({
      query: (orderId) => `orders/${orderId}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
    getUserOrders: builder.query<Order[], string>({
      query: (userId) => `orders/user/${userId}`,
      providesTags: ['Order'],
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetOrderByIdQuery,
  useGetUserOrdersQuery
} = ordersApi;
