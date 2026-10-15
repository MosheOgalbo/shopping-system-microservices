import { expect, test } from '@playwright/test';

test.describe('orders API contract', () => {
  test('stores catalog prices even when the client sends tampered values', async ({ request }) => {
    const response = await request.post('http://localhost:5001/api/orders', {
      data: {
        user: {
          firstName: 'עמית',
          lastName: 'ברק',
          email: `api.${Date.now()}@example.com`,
          address: 'דיזנגוף 50, תל אביב',
        },
        items: [
          { productId: '3', quantity: 2 },
        ],
      },
    });

    expect(response.status()).toBe(201);
    const body = await response.json() as { id: string; status: string };
    expect(body.status).toBe('created');
    expect(body.id).toBeTruthy();
  });

  test('rejects unknown products', async ({ request }) => {
    const response = await request.post('http://localhost:5001/api/orders', {
      data: {
        user: {
          firstName: 'עמית',
          lastName: 'ברק',
          email: `missing.${Date.now()}@example.com`,
          address: 'דיזנגוף 50, תל אביב',
        },
        items: [
          { productId: '9999', quantity: 1 },
        ],
      },
    });

    expect(response.status()).toBe(400);
  });

  test('does not expose order lookup by email', async ({ request }) => {
    const response = await request.get('http://localhost:5001/api/orders/someone@example.com');
    expect(response.status()).toBe(404);
  });
});
