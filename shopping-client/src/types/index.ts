
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  Id: number;
  Name: string;
  icon?: string;
  productCount?: number;
}

export interface ProductsGridProps {
  products: Product[];
  highlightedId?: string | null;
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

export interface SearchSuggestion {
  id: string;
  name: string;
  category: string;
  price: number;
}

export interface SearchInputProps {
  value: string;
  onChange: (term: string) => void;
  suggestions?: SearchSuggestion[];
  onSelectSuggestion?: (productId: string) => void;
  suggestionsReady?: boolean;
}

export interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId?: string;
}

export interface PropsProductCard {
  product: Product;
  highlighted?: boolean;
}



export interface CategoryFilter {
  Id: number;
  Name: string;
  icon?: string;
  productCount?: number;
}

export interface FormFieldProps {
  name: keyof FormData;
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  error: string;
  maxLength?: number;
  autoComplete?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
};

export type FormErrors = Record<keyof FormData, string>;

export interface OrderFormProps {
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
}
