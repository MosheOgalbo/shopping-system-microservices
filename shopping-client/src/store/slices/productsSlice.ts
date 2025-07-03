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
  return '📦'; // אייקון ברירת מחדל
};

// Mock products with Hebrew names (כגיבוי)
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
    // פונקציה חדשה לטעינת נתונים מהבקאנד
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
