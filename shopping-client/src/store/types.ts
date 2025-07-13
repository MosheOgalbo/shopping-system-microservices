export interface Product {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface Order {
  id: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone?: string;
  };
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';
  createdAt: string;
  estimatedDelivery?: string;
}

export interface OrderState {
  currentOrder: Order | null;
  orderHistory: Order[];
  loading: boolean;
  error: string | null;
}

export interface ProductsState {
  products: Product[];
  selectedCategory: string;
  searchQuery: string;
  loading: boolean;
  error: string | null;
}
