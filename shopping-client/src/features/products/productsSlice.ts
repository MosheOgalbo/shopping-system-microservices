import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, BackendProduct, ProductsState } from './types';

// ממשקים עבור טיפוסי המידע
interface IconMap {
  [key: string]: string;
}

// המרת מוצר ממבנה הבקאנד למבנה הפרונטאנד
const transformBackendProduct = (backendProduct: BackendProduct): Product => ({
  id: backendProduct.Id.toString(),
  name: backendProduct.Name,
  nameEn: backendProduct.Name.toLowerCase().replace(/\s+/g, '-'),
  category: backendProduct.CategoryName,
  price: backendProduct.Price,
  description: backendProduct.Description,
  image: getProductIcon(backendProduct.CategoryName)
});

// החזרת אייקון מתאים לקטגוריה
const getProductIcon = (category: string): string => {
  const iconMap: IconMap = {
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

// נתוני דמה ראשוניים למוצרים
const dummyProducts: Product[] = [
  { id: '1', name: 'מוצר א', category: 'קטגוריה 1', price: 100 },
  { id: '2', name: 'מוצר ב', category: 'קטגוריה 1', price: 150 },
  { id: '3', name: 'מוצר ג', category: 'קטגוריה 2', price: 200 },
];

// מצב התחלתי של הסלייס
const initialState: ProductsState = {
  products: dummyProducts,
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
      state.products = action.payload.map(transformBackendProduct);
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
