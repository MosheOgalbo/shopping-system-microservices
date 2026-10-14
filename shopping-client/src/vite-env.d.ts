/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_PRODUCTS?: string;
  readonly VITE_API_ORDERS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
