import { orderSchema } from './order.schema';

const validOrder = {
  user: {
    firstName: 'דנה',
    lastName: 'כהן',
    email: 'dana@example.com',
    address: 'הרצל 10, תל אביב',
  },
  items: [
    { productId: '3', name: 'חולצה כחולה', quantity: 2, price: 89.99 },
  ],
};

describe('orderSchema', () => {
  it('accepts a complete order', () => {
    const result = orderSchema.safeParse(validOrder);
    expect(result.success).toBe(true);
  });

  it('rejects an empty cart', () => {
    const result = orderSchema.safeParse({ ...validOrder, items: [] });
    expect(result.success).toBe(false);
  });

  it('rejects a quantity of zero', () => {
    const result = orderSchema.safeParse({
      ...validOrder,
      items: [{ productId: '3', name: 'חולצה כחולה', quantity: 0 }],
    });
    expect(result.success).toBe(false);
  });

  it('rejects a name with digits and markup in the address', () => {
    const result = orderSchema.safeParse({
      ...validOrder,
      user: { ...validOrder.user, firstName: 'דנה1', address: '<script>alert(1)</script>' },
    });
    expect(result.success).toBe(false);
  });

  it('rejects unknown fields and a non-integer quantity', () => {
    const extraField = orderSchema.safeParse({
      ...validOrder,
      user: { ...validOrder.user, role: 'admin' },
    });
    const fractional = orderSchema.safeParse({
      ...validOrder,
      items: [{ ...validOrder.items[0], quantity: 1.5 }],
    });
    expect(extraField.success).toBe(false);
    expect(fractional.success).toBe(false);
  });

  it('stores the email in lowercase', () => {
    const result = orderSchema.safeParse({
      ...validOrder,
      user: { ...validOrder.user, email: 'Dana@Example.com' },
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.user.email).toBe('dana@example.com');
    }
  });

  it('rejects a missing email and a short address', () => {
    const result = orderSchema.safeParse({
      ...validOrder,
      user: { ...validOrder.user, email: 'not-an-email', address: 'רח' },
    });
    expect(result.success).toBe(false);
  });
});
