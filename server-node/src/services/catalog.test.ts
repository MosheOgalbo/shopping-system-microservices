import { authorizeOrderItems } from './catalog';

const catalog = [
  { id: 3, name: 'חולצה כחולה', price: 89.99 },
  { id: 1, name: 'לפטופ Dell', price: 2999.99 },
];

describe('authorizeOrderItems', () => {
  it('uses catalog name and price instead of client values', () => {
    const authorized = authorizeOrderItems(
      [{ productId: '3', quantity: 2 }],
      catalog,
    );

    expect(authorized).toEqual([
      { productId: '3', name: 'חולצה כחולה', quantity: 2, price: 89.99 },
    ]);
  });

  it('rejects unknown product ids', () => {
    expect(() => authorizeOrderItems(
      [{ productId: '999', quantity: 1 }],
      catalog,
    )).toThrow('Unknown productId: 999');
  });
});
