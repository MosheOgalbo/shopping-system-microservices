import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Category {
  id: number;
  name: string;
  nameEn: string;
  icon?: string;
}

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      // Remove the 'query' property and use only 'queryFn'
      queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        try {
          const result = await baseQuery('categories');

          if (result.error) {
            throw new Error('API Error');
          }

          if (result.data) {
            return { data: result.data as Category[] };
          }

          throw new Error('No data received');
        } catch (error) {
          console.warn('Using fallback categories data:', error);

          // Return mock data as fallback
          const mockCategories: Category[] = [
            { id: 1, name: 'פירות וירקות', nameEn: 'fruits-vegetables', icon: '🥕' },
            { id: 2, name: 'חלב וביצים', nameEn: 'dairy-eggs', icon: '🥛' },
            { id: 3, name: 'בשר ודגים', nameEn: 'meat-fish', icon: '🥩' },
            { id: 4, name: 'לחם ומאפים', nameEn: 'bread-bakery', icon: '🍞' },
            { id: 5, name: 'משקאות', nameEn: 'beverages', icon: '🥤' },
            { id: 6, name: 'חטיפים', nameEn: 'snacks', icon: '🍿' }
          ];

          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 500));
          return { data: mockCategories };
        }
      },
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
