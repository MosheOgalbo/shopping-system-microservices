import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS } from '../util/constants';
import { BackendCategory, BackendProduct, Category } from './types';
import { categoryIcon } from '../util/products';

export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ENDPOINTS.PRODUCTS,
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Product', 'Category'],
  endpoints: (builder) => ({
    getProducts: builder.query<BackendProduct[], void>({
      query: () => 'Products',
      providesTags: ['Product'],
    }),
    getProductsByCategory: builder.query<BackendProduct[], number>({
      query: (categoryId) => `Products/category/${categoryId}`,
      providesTags: ['Product'],
    }),
    getCategories: builder.query<Category[], void>({
      query: () => 'Categories',
      transformResponse: (response: BackendCategory[]) =>
        response.map(category => ({
          Id: category.id,
          Name: category.name,
          icon: categoryIcon(category.name),
          productCount: category.productCount ?? 0,
        })),
      providesTags: ['Category'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetCategoriesQuery,
} = catalogApi;
