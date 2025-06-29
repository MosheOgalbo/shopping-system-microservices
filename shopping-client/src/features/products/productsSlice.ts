import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './types';

const dummyProducts: Product[] = [
  { id: '1', name: 'מוצר א', category: 'קטגוריה 1', price: 100 },
  { id: '2', name: 'מוצר ב', category: 'קטגוריה 1', price: 150 },
  { id: '3', name: 'מוצר ג', category: 'קטגוריה 2', price: 200 },
];

interface ProductsState {
  products: Product[];
  selectedCategory: string;
}

const initialState: ProductsState = {
  products: dummyProducts,
  selectedCategory: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setCategory } = productsSlice.actions;
export default productsSlice.reducer;
