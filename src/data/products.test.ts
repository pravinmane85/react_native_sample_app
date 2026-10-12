import { products } from './products';

describe('products data', () => {
  test('has unique ids', () => {
    const ids = products.map((product) => product.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('every product has the required fields', () => {
    for (const product of products) {
      expect(product.name).toBeTruthy();
      expect(product.make).toBeTruthy();
      expect(product.price).toMatch(/^£/);
      expect(['phone', 'sim']).toContain(product.category);
    }
  });

  test('includes both phones and SIM cards', () => {
    expect(products.some((product) => product.category === 'phone')).toBe(true);
    expect(products.some((product) => product.category === 'sim')).toBe(true);
  });
});
