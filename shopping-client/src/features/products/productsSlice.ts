import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BackendProduct, ProductsState } from './types';
import { toProduct } from '../../util/products';

const initialState: ProductsState = {
  products: [],
  selectedCategory: '',
  loading: false,
  error: null,
};

// יצירת סלייס לניהול מוצרים
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // קביעת קטגוריה נבחרת
    setCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload === 'כל הקטגוריות' ? '' : action.payload;
    },
    // עדכון רשימת המוצרים מהבקאנד
    setBackendProducts(state, action: PayloadAction<BackendProduct[]>) {
      state.products = action.payload.map(toProduct);
      state.loading = false;
      state.error = null;
    },
    // קביעת מצב טעינה
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    // קביעת שגיאה
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    }
  },
});

// ייצוא פעולות הסלייס
export const {
  setCategory,
  setBackendProducts,
  setLoading,
  setError
} = productsSlice.actions;

// ייצוא הרדיוסר כברירת מחדל
export default productsSlice.reducer;
