import { describe, expect, it } from 'vitest';
import { toProduct } from './products';

describe('toProduct', () => {
  it('keeps a real image url from the catalog', () => {
    const product = toProduct({
      Id: 3,
      Name: 'חולצה כחולה',
      Description: 'כותנה',
      Price: 89.99,
      CategoryId: 2,
      CategoryName: 'ביגוד',
      Image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      CreatedAt: '2024-01-01T00:00:00Z',
    });

    expect(product.id).toBe('3');
    expect(product.image).toContain('https://');
    expect(product.category).toBe('ביגוד');
  });

  it('falls back to a category icon when the image is not a url', () => {
    const product = toProduct({
      Id: 1,
      Name: 'לפטופ',
      Description: '',
      Price: 10,
      CategoryId: 1,
      CategoryName: 'אלקטרוניקה',
      Image: 'https://example.com/missing.jpg'.replace('https://', ''),
      CreatedAt: '2024-01-01T00:00:00Z',
    });

    expect(product.image).toBe('📱');
  });
});
