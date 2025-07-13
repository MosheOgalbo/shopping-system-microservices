export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  image?: string;
  nameEn?: string;
}

export interface BackendProduct {
  Id: number;
  Name: string;
  Description: string;
  Price: number;
  CategoryId: number;
  CategoryName: string;
  Image: string; // URL לתמונה
  CreatedAt: string;
}

// טיפוס לפריט בעגלה
export interface CartItem extends Product {
  quantity: number;
}

// טיפוס לשליחת הזמנה לשרת
export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
}

export interface OrderRequest {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
  };
  items: OrderItem[];
}

export interface ProductsState {
  products: Product[];
  selectedCategory: string;
  loading: boolean;
  error: string | null;
}
