export interface BackendProduct {
  Id: number;
  Name: string;
  Description: string;
  Price: number;
  CategoryId: number;
  CategoryName: string;
  Image: string;
  CreatedAt: string;
}

// טיפוס הנתונים שנשלחים לשרת
export interface OrderRequest {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
  };
  items: {
    productId: string;
    name: string;
    quantity: number;
  }[];
}

export  interface Category {
  Id: number;
  Name: string;
  icon?: string;
}
