
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
  Image?: string; // URL לתמונה - אופציונלי
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

// טיפוס לקטגוריה מהשרת
export interface BackendCategory {
  Id: number;
  Name: string;
  CreatedAt?: string;
}

// טיפוס לקטגוריה בצד הלקוח
export interface Category {
  id: number;
  name: string;
  nameEn: string;
  icon?: string;
}

export interface ProductsGridProps {
  products: Product[];
}

export interface ResultsInfoProps {
  count?: number;
  searchTerm?: string;
  category?: string;
}

export interface FilterBarProps {
  categories: CategoryFilter[];
  selectedCategoryId: number | null;
  onCategoryChange: (categoryId: number | null) => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  categoriesLoading?: boolean;
}

export interface SearchInputProps {
  value: string;
  onChange: (term: string) => void;
}

export interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId?: string;
}

export interface PropsProductCard {
  product: Product;
}

export interface OrderSummaryProps {
  items: CartItem[];
  total: number;
}

export interface CategoryFilter {
  Id: number;
  Name: string;
  icon?: string;
}
