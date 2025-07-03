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
  CreatedAt: string;
}
