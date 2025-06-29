import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS } from './util/constants';


interface Category {
  Id: number;
  Name: string;
  Description: string;
  CreatedAt: string;
  ProductCount: number;
}

interface Product {
  Id: number;
  Name: string;
  Description: string;
  Price: number;
  CategoryId: number;
  CategoryName: string;
  CreatedAt: string;
}

interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  price?: number;
}

interface Order {
  id?: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
  };
  items: CartItem[];
  createdAt?: string;
}

// API Services
const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5177/api/' }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => 'Categories',
    }),
    getProducts: builder.query<Product[], void>({
      query: () => 'Products',
    }),
  }),
});

const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: (builder) => ({
    placeOrder: builder.mutation<Order, Order>({
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
