import { describe, expect, it } from 'vitest';
import { toProduct } from './products';

describe('toProduct', () => {
  it('keeps a local catalog image path', () => {
    const product = toProduct({
      id: 3,
      name: 'חולצה כחולה',
      description: 'כותנה',
      price: 89.99,
      categoryId: 2,
      categoryName: 'ביגוד',
      image: '/catalog/shirt.jpg',
      createdAt: '2024-01-01T00:00:00Z',
    });

    expect(product.id).toBe('3');
    expect(product.image).toBe('/catalog/shirt.jpg');
    expect(product.category).toBe('ביגוד');
  });

  it('falls back to a category icon when the image is not a url', () => {
    const product = toProduct({
      id: 1,
      name: 'לפטופ',
      description: '',
      price: 10,
      categoryId: 1,
      categoryName: 'אלקטרוניקה',
      image: 'missing.jpg',
      createdAt: '2024-01-01T00:00:00Z',
    });

    expect(product.image).toBe('📱');
  });
});
