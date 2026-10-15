const withTrailingSlash = (url: string) => (url.endsWith('/') ? url : `${url}/`);

export const API_ENDPOINTS = {
  PRODUCTS: withTrailingSlash(import.meta.env.VITE_API_PRODUCTS || 'http://localhost:5177/api/'),
  ORDERS: withTrailingSlash(import.meta.env.VITE_API_ORDERS || 'http://localhost:5001/api/'),
};

// קבועים לנתיבים - מונעים טעויות כתיב
export const ROUTES_Header = {
  SHOPPING: '/shopping',
  ORDER: '/order'
} as const;

// קבועים לולידציה עבור הזמנה
export const VALIDATION_RULES = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MIN_ADDRESS_LENGTH: 5,
  MAX_ADDRESS_LENGTH: 300,
  MAX_EMAIL_LENGTH: 200,
  NAME_PATTERN: /^(?=.*\p{L})[\p{L}\s'-]+$/u,
  ADDRESS_PATTERN: /^(?=.*[\p{L}\p{N}])[\p{L}\p{N}\s,.'#/’-]+$/u,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u,
} as const;

export const TEXTS_OrderSummary = {
  TITLE: 'סיכום הזמנה',
  TOTAL: 'סה"כ לתשלום:',
  EMPTY_CART: 'העגלה ריקה',
  EMPTY_CART_SUBTITLE: 'הוסף מוצרים כדי להתחיל הזמנה',
  DEFAULT_PRODUCT_ICON: '📦'
} as const;

// מיפוי אייקונים לפי קטגוריות
export const CATEGORY_ICONS = {
  'אלקטרוניקה': '📱',
  'ביגוד': '👕',
  'ספרים': '📚',
  'ספורט': '⚽',
  'בית': '🏠',
  'צעצועים': '🧸',
  'מזון': '🍎',
  'יופי': '💄'
} as const;
