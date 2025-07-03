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
    baseUrl: 'http://localhost:5177/api/', // שונה ל-.NET server
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        try {
          const result = await baseQuery('categories'); // משתמש ב-.NET endpoint

          if (result.error) {
            throw new Error('API Error');
          }

          if (result.data) {
            // המרה מהפורמט של .NET לפורמט של React
            const categories = (result.data as any[]).map(cat => ({
              id: cat.Id || cat.id,
              name: cat.Name || cat.name,
              nameEn: cat.Name?.toLowerCase().replace(/\s+/g, '-') || 'category',
              icon: getIconForCategory(cat.Name || cat.name)
            }));
            return { data: categories };
          }

          throw new Error('No data received');
        } catch (error) {
          console.warn('API unavailable, using fallback categories data:', error);

          // Return mock data as fallback
          const mockCategories: Category[] = [
            { id: 1, name: 'אלקטרוניקה', nameEn: 'electronics', icon: '📱' },
            { id: 2, name: 'ביגוד', nameEn: 'clothing', icon: '👕' },
            { id: 3, name: 'ספורט', nameEn: 'sports', icon: '⚽' },
            { id: 4, name: 'בית וגן', nameEn: 'home-garden', icon: '🏠' },
            { id: 5, name: 'ספרים', nameEn: 'books', icon: '📚' },
            { id: 6, name: 'צעצועים', nameEn: 'toys', icon: '🧸' }
          ];

          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 500));
          return { data: mockCategories };
        }
      },
    }),
  }),
});

// Helper function to get icon for category
function getIconForCategory(categoryName: string): string {
  const iconMap: { [key: string]: string } = {
    'אלקטרוניקה': '📱',
    'ביגוד': '👕',
    'ספורט': '⚽',
    'בית': '🏠',
    'ספרים': '📚',
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
