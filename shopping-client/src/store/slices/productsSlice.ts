import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './cartSlice';

const transformBackendProduct = (backendProduct: any): Product => ({
  id: backendProduct.Id?.toString() || backendProduct.id?.toString(),
  name: backendProduct.Name || backendProduct.name,
  nameEn: (backendProduct.Name || backendProduct.name)?.toLowerCase().replace(/\s+/g, '-') || 'product',
  category: backendProduct.CategoryName || backendProduct.category,
  price: backendProduct.Price || backendProduct.price || 0,
  description: backendProduct.Description || backendProduct.description,
  image: getProductIcon(backendProduct.CategoryName || backendProduct.category)
});

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
  {
    id: '2',
    name: 'בננות',
    nameEn: 'bananas',
    category: 'פירות וירקות',
    price: 8.50,
    description: 'בננות בשלות ועסיסיות',
    image: '🍌'
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
    setBackendProducts(state, action: PayloadAction<any[]>) {
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
