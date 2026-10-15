export interface BackendProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  categoryName: string;
  image?: string;
  createdAt: string;
}

export interface BackendCategory {
  id: number;
  name: string;
  productCount?: number;
}

export interface Category {
  Id: number;
  Name: string;
  icon?: string;
  productCount: number;
}

export interface OrderRequest {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
  };
  items: {
    productId: string;
    quantity: number;
  }[];
}
