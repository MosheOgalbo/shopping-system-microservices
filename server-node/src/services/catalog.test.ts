import { authorizeOrderItems } from './catalog';

const catalog = [
  { Id: 3, Name: 'חולצה כחולה', Price: 89.99 },
  { Id: 1, Name: 'לפטופ Dell', Price: 2999.99 },
];

describe('authorizeOrderItems', () => {
  it('replaces client-supplied name and price with catalog values', () => {
    const authorized = authorizeOrderItems(
      [{ productId: '3', name: 'hacked', quantity: 2, price: 1 }],
      catalog,
    );

    expect(authorized).toEqual([
      { productId: '3', name: 'חולצה כחולה', quantity: 2, price: 89.99 },
    ]);
  });

  it('rejects unknown product ids', () => {
    expect(() => authorizeOrderItems(
      [{ productId: '999', name: 'x', quantity: 1, price: 10 }],
      catalog,
    )).toThrow('Unknown productId: 999');
  });
});
