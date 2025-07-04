import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface BackendProduct {
  Id: number;
  Name: string;
  Description: string;
  Price: number;
  CategoryId: number;
  CategoryName: string;
  CreatedAt: string;
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5177/api/',
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
          const result = await baseQuery('http://localhost:5177/api/Products');

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
              Id: 2,
              Name: "חולצה כחולה",
              Description: "חולצת כותנה איכותית",
              Price: 89.99,
              CategoryId: 2,
              CategoryName: "ביגוד",
              CreatedAt: "2024-01-01T00:00:00Z"
            },
            {
              Id: 1,
              Name: "לפטופ Dell",
              Description: "מחשב נייד מתקדם",
              Price: 2999.99,
              CategoryId: 1,
              CategoryName: "אלקטרוניקה",
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
