import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS } from '../util/constants';

export interface BackendProduct {
  Id: number;
  Name: string;
  Description: string;
  Price: number;
  CategoryId: number;
  CategoryName: string;
  Image: string; // URL לתמונה
  CreatedAt: string;
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ENDPOINTS.PRODUCTS,
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<BackendProduct[], void>({
      queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        try {
          const result = await baseQuery('Products');

          if (result.error) {
            throw new Error('API Error');
          }

          if (result.data) {
            return { data: result.data as BackendProduct[] };
          }

          throw new Error('No data received');
        } catch (error) {
          console.warn('API unavailable, using fallback products data:', error);

          const mockProducts: BackendProduct[] = [
            {
              Id: 1,
              Name: "לפטופ Dell",
              Description: "מחשב נייד מתקדם",
              Price: 2999.99,
              CategoryId: 1,
              CategoryName: "אלקטרוניקה",
              Image: "https://example.com/images/dell-laptop.jpg",
              CreatedAt: "2024-01-01T00:00:00Z"
            },

          ];

          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 500));
          return { data: mockProducts };
        }
      },
      providesTags: ['Product'],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
