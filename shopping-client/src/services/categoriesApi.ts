import { API_ENDPOINTS } from '../utils/constants';
export const fetchCategories = async () => {
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
      { id: 1, name: 'פירות וירקות', nameEn: 'fruits-vegetables' },
      { id: 2, name: 'חלב וביצים', nameEn: 'dairy-eggs' },
      { id: 3, name: 'בשר ודגים', nameEn: 'meat-fish' },
      { id: 4, name: 'לחם ומאפים', nameEn: 'bread-bakery' },
      { id: 5, name: 'משקאות', nameEn: 'beverages' },
      { id: 6, name: 'חטיפים', nameEn: 'snacks' }
    ];

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCategories;
  }
};
