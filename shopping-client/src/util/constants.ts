const withTrailingSlash = (url: string) => (url.endsWith('/') ? url : `${url}/`);

export const API_ENDPOINTS = {
  PRODUCTS: withTrailingSlash(import.meta.env.VITE_API_PRODUCTS || 'http://localhost:5177/api/'),
  ORDERS: withTrailingSlash(import.meta.env.VITE_API_ORDERS || 'http://localhost:5001/api/'),
};

export const ROUTES = {
  SHOPPING: '/shopping',
  ORDER: '/order'
} as const;

export const VALIDATION_RULES = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MIN_ADDRESS_LENGTH: 5,
  MAX_ADDRESS_LENGTH: 300,
  MAX_EMAIL_LENGTH: 200,
  NAME_PATTERN: /^(?=.*\p{L})[\p{L}\s'\-׳״]+$/u,
  ADDRESS_PATTERN: /^(?=.*[\p{L}\p{N}])[\p{L}\p{N}\s,.'#/\-׳״’-]+$/u,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u,
} as const;
