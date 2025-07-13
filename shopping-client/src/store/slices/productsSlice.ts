import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, BackendProduct } from '../../features/products/types';

// פונקציה להמרת נתונים מהבקאנד
const transformBackendProduct = (backendProduct: BackendProduct): Product => ({
  id: backendProduct.Id.toString(),
  name: backendProduct.Name,
  nameEn: backendProduct.Name.toLowerCase().replace(/\s+/g, '-'),
  category: backendProduct.CategoryName,
  price: backendProduct.Price,
  description: backendProduct.Description,
  image: backendProduct.Image || getProductIcon(backendProduct.CategoryName) // משתמש בתמונה מהשרת או באייקון
});

// פונקציה לקבלת אייקון לפי קטגוריה (fallback)
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

// Mock products with Hebrew names
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'תפוחים אדומים',
    nameEn: 'red-apples',
    category: 'פירות וירקות',
    price: 15.90,
    description: 'תפוחים אדומים טריים ומתוקים',
    image: '🍎'
  },

];

interface ProductsState {
  products: Product[];
  selectedCategory: string;
  searchQuery: string;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: mockProducts,
  selectedCategory: '',
  searchQuery: '',
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    setBackendProducts(state, action: PayloadAction<BackendProduct[]>) {
      state.products = action.payload.map(transformBackendProduct);
      state.loading = false;
      state.error = null;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload === 'כל הקטגוריות' ? '' : action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
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
  setProducts,
  setBackendProducts,
  setCategory,
  setSearchQuery,
  setLoading,
  setError
} = productsSlice.actions;

export default productsSlice.reducer;
