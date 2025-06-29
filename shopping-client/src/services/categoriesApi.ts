import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS } from './util/constants';
// Types
interface Category {
  Id: number;
  Name: string;
  Description: string;
  CreatedAt: string;
  ProductCount: number;
}

interface Product {
  Id: number;
  Name: string;
  Description: string;
  Price: number;
  CategoryId: number;
  CategoryName: string;
  CreatedAt: string;
}

interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  price?: number;
}

interface Order {
  id?: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
  };
  items: CartItem[];
  createdAt?: string;
}



// API Services
const fetchCategories = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.CATEGORIES, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);

    // Fallback to mock data if API fails
    const mockCategories = [
      { Id: 1, Name: 'פירות וירקות', Description: 'פירות וירקות טריים', CreatedAt: new Date().toISOString(), ProductCount: 5 },
      { Id: 2, Name: 'חלב וביצים', Description: 'מוצרי חלב וביצים', CreatedAt: new Date().toISOString(), ProductCount: 8 },
      { Id: 3, Name: 'בשר ודגים', Description: 'בשר טרי ודגים', CreatedAt: new Date().toISOString(), ProductCount: 12 },
      { Id: 4, Name: 'לחם ומאפים', Description: 'לחם טרי ומאפים', CreatedAt: new Date().toISOString(), ProductCount: 6 },
      { Id: 5, Name: 'משקאות', Description: 'משקאות קרים וחמים', CreatedAt: new Date().toISOString(), ProductCount: 10 },
      { Id: 6, Name: 'חטיפים', Description: 'חטיפים ומתוקים', CreatedAt: new Date().toISOString(), ProductCount: 15 }
    ];

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCategories;
  }
};
