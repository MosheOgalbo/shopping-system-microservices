import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './cartSlice';

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
  {
    id: '3',
    name: 'חלב טרי 3%',
    nameEn: 'fresh-milk',
    category: 'חלב וביצים',
    price: 6.90,
    description: 'חלב טרי איכותי 1 ליטר',
    image: '🥛'
  },
  {
    id: '4',
    name: 'ביצים טריות',
    nameEn: 'fresh-eggs',
    category: 'חלב וביצים',
    price: 12.90,
    description: 'תריסר ביצים טריות מחוות מקומיות',
    image: '🥚'
  },
  {
    id: '5',
    name: 'לחם מחיטה מלאה',
    nameEn: 'whole-wheat-bread',
    category: 'לחם ומאפים',
    price: 9.90,
    description: 'לחם טרי מחיטה מלאה',
    image: '🍞'
  },
  {
    id: '6',
    name: 'עוף טרי',
    nameEn: 'fresh-chicken',
    category: 'בשר ודגים',
    price: 32.90,
    description: 'עוף טרי איכותי לק"ג',
    image: '🐔'
  },
  {
    id: '7',
    name: 'מים מינרליים',
    nameEn: 'mineral-water',
    category: 'משקאות',
    price: 4.50,
    description: 'מים מינרליים טבעיים 1.5 ליטר',
    image: '💧'
  },
  {
    id: '8',
    name: 'שקדים קלויים',
    nameEn: 'roasted-almonds',
    category: 'חטיפים',
    price: 18.90,
    description: 'שקדים קלויים ומומלחים 200 גרם',
    image: '🥜'
  }
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
    setCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
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
  setCategory,
  setSearchQuery,
  setLoading,
  setError
} = productsSlice.actions;

export default productsSlice.reducer;
