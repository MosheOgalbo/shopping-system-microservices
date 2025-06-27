// API Endpoints
export const API_ENDPOINTS = {
  CATEGORIES: 'http://localhost:5177/api/Products',
  ORDERS: 'http://localhost:3000/api/orders',
};

// App Constants
export const APP_CONFIG = {
  APP_NAME: 'מערכת עגלת קניות',
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 99,
  DEBOUNCE_DELAY: 300,
};

// Form Validation
export const VALIDATION_RULES = {
  REQUIRED_FIELDS: {
    firstName: 'שם פרטי הוא שדה חובה',
    lastName: 'שם משפחה הוא שדה חובה',
    email: 'כתובת אימייל היא שדה חובה',
    address: 'כתובת מלאה היא שדה חובה',
  },
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MAX_ADDRESS_LENGTH: 200,
};

// UI Constants
export const UI_MESSAGES = {
  LOADING: 'טוען...',
  NO_CATEGORIES: 'לא נמצאו קטגוריות',
  EMPTY_CART: 'העגלה ריקה',
  ORDER_SUCCESS: 'ההזמנה נשלחה בהצלחה!',
  ORDER_ERROR: 'שגיאה בשליחת ההזמנה',
  NETWORK_ERROR: 'שגיאת רשת - נסה שוב',
  VALIDATION_ERROR: 'אנא מלא את כל השדות החובה',
};

// Screen Names
export const SCREENS = {
  SHOPPING: 'shopping',
  ORDER: 'order',
};
