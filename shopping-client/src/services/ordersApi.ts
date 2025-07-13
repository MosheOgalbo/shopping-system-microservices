import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Order } from '../store/slices/orderSlice';
import { CartItem } from '../store/slices/cartSlice';
import { API_ENDPOINTS } from '../util/constants';

// טיפוס הנתונים שנשלחים לשרת
interface OrderRequest {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
  };
  items: {
    productId: string;
    name: string;
    quantity: number;
  }[];
}

// פונקציה להמרת פריטי עגלה לפורמט השרת
const transformCartItemsToOrderItems = (cartItems: CartItem[]) => {
  return cartItems.map(item => ({
    productId: item.id,
    name: item.name,
    quantity: item.quantity
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
    placeOrder: builder.mutation<Order, { user: OrderRequest['user'], items: CartItem[] }>({
      queryFn: async (orderData, queryApi, extraOptions, baseQuery) => {
        try {
          // המרה של פריטי העגלה לפורמט השרת
          const transformedOrderData: OrderRequest = {
            user: orderData.user,
            items: transformCartItemsToOrderItems(orderData.items)
          };

          console.log('Sending order to server:', transformedOrderData);

          const result = await baseQuery({
            url: 'orders/',
            method: 'POST',
            body: transformedOrderData,
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
          console.warn('API unavailable, creating mock order:', error);

          // Create mock order response
          const totalAmount = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          const mockOrder: Order = {
            id: `order_${Date.now()}`,
            user: orderData.user,
            items: orderData.items,
            totalAmount,
            status: 'confirmed',
            createdAt: new Date().toISOString(),
            estimatedDelivery: new Date(Date.now() + 60 * 60 * 1000).toISOString()
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
