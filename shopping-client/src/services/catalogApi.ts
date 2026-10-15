import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS } from '../util/constants';
import { BackendCategory, BackendProduct, Category, ProductPage } from './types';
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
    getProductPage: builder.query<ProductPage, { skip: number; take: number; sort: string; generation: number }>({
      query: ({ skip, take, sort }) =>
        `Products?skip=${skip}&take=${take}&sort=${encodeURIComponent(sort)}`,
      serializeQueryArgs: ({ endpointName, queryArgs }) =>
        `${endpointName}-${queryArgs.sort}-${queryArgs.generation}`,
      merge: (current, incoming) => {
        if (incoming.skip === 0) {
          current.items = incoming.items;
        } else {
          current.items.push(...incoming.items);
        }
        current.total = incoming.total;
        current.skip = incoming.skip;
        current.take = incoming.take;
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg?.skip !== previousArg?.skip,
      providesTags: ['Product'],
    }),
    getProductSearch: builder.query<ProductPage, { q: string; sort: string }>({
      query: ({ q, sort }) => `Products?q=${encodeURIComponent(q)}&sort=${encodeURIComponent(sort)}`,
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
  useGetProductPageQuery,
  useGetProductSearchQuery,
  useGetProductsByCategoryQuery,
  useGetCategoriesQuery,
} = catalogApi;
