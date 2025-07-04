import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, BackendProduct } from './types';

// פונקציה להמרת נתונים מהבקאנד
const transformBackendProduct = (backendProduct: BackendProduct): Product => ({
  id: backendProduct.Id.toString(),
  name: backendProduct.Name,
  nameEn: backendProduct.Name.toLowerCase().replace(/\s+/g, '-'),
  category: backendProduct.CategoryName,
  price: backendProduct.Price,
  description: backendProduct.Description,
  image: getProductIcon(backendProduct.CategoryName)
});

// פונקציה לקבלת אייקון לפי קטגוריה
const getProductIcon = (category: string): string => {
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
    if (category?.includes(key)) {
      return icon;
    }
  }
  return '📦';
};

const dummyProducts: Product[] = [
  { id: '1', name: 'מוצר א', category: 'קטגוריה 1', price: 100 },
  { id: '2', name: 'מוצר ב', category: 'קטגוריה 1', price: 150 },
  { id: '3', name: 'מוצר ג', category: 'קטגוריה 2', price: 200 },
];

interface ProductsState {
  products: Product[];
  selectedCategory: string;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: dummyProducts,
  selectedCategory: '',
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload === 'כל הקטגוריות' ? '' : action.payload;
    },
    // setProducts(state, action: PayloadAction<Product[]>) {
    //   state.products = action.payload;
    //   state.loading = false;
    //   state.error = null;
    // },

    setBackendProducts(state, action: PayloadAction<BackendProduct[]>) {
      state.products = action.payload.map(transformBackendProduct);
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    }
  },
});

export const {
  setCategory,
  setBackendProducts,
  setLoading,
  setError
} = productsSlice.actions;

export default productsSlice.reducer;
