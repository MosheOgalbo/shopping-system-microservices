import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS } from '../util/constants';
import { Category } from './types';
import { categoryIcon } from '../util/products';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ENDPOINTS.PRODUCTS,
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => 'Categories',
      transformResponse: (response: Array<{ Id?: number; id?: number; Name?: string; name?: string }>) =>
        response.map(category => {
          const name = category.Name || category.name || '';
          return {
            Id: category.Id || category.id || 0,
            Name: name,
            icon: categoryIcon(name),
          };
        }),
      providesTags: ['Category'],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
