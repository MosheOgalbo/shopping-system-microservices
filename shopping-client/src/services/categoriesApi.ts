import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS } from '../util/constants';
import { Category } from './types';


export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ENDPOINTS.PRODUCTS,
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        try {
          const result = await baseQuery('Categories');

          if (result.error) {
            throw new Error('API Error');
          }

          if (result.data) {
            // המרה מהפורמט של .NET לפורמט של React
            const categories = (result.data as any[]).map(cat => ({
              Id: cat.Id || cat.id,
              Name: cat.Name || cat.name,
              icon: getIconForCategory(cat.Name || cat.name)
            }));
            return { data: categories };
          }

          throw new Error('No data received');
        } catch (error) {
          console.warn('API unavailable, using fallback categories data:', error);

          // Return mock data as fallback
          const mockCategories: Category[] = [
            { Id: 1, Name: 'אלקטרוניקה', icon: '📱' },
            { Id: 2, Name: 'ביגוד', icon: '👕' },
            { Id: 3, Name: 'ספרים', icon: '📚' },
            { Id: 4, Name: 'ספורט', icon: '⚽' },
            { Id: 5, Name: 'בית', icon: '🏠' },
          ];

          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 500));
          return { data: mockCategories };
        }
      },
      providesTags: ['Category'],
    }),
  }),
});

// Helper function to get icon for category
function getIconForCategory(categoryName: string): string {
  const iconMap: { [key: string]: string } = {
    'אלקטרוניקה': '📱',
    'ביגוד': '👕',
    'ספרים': '📚',
    'ספורט': '⚽',
    'בית': '🏠',
    'צעצועים': '🧸',
    'מזון': '🍎',
    'יופי': '💄'
  };

  for (const [key, icon] of Object.entries(iconMap)) {
    if (categoryName.includes(key)) {
      return icon;
    }
  }

  return '📦'; // default icon
}

export const { useGetCategoriesQuery } = categoriesApi;
