import FreeAction from './freeAction';
import {SKU} from "../products/types";
import Price from "../products/price";
import Product from "../products/product";

describe('FreeAction', () => {
  test('should get correct sku, name and count ratio', () => {
    const freeAction = new FreeAction(SKU.VGA, 1);
    expect(freeAction.sku).toEqual(SKU.VGA);
    expect(freeAction.name).toEqual('FreeAction');
    expect(freeAction.countRatio).toEqual(1);
  });

  test('should pricing product correctly', () => {
    const freeAction = new FreeAction(SKU.MBP, 0.5);
    const pricingProduct = freeAction.pricing(new Product(SKU.MBP, 'test', new Price(20)));
    expect(pricingProduct.sku).toEqual(SKU.MBP);
    expect(pricingProduct.name).toEqual('test');
    expect(pricingProduct.price).toEqual(new Price(0));
  });

  test('should pricing products correctly', () => {
    const freeAction = new FreeAction(SKU.MBP, 0.5);
    const pricingProducts = freeAction.execute([
      new Product(SKU.MBP, 'test', new Price(20)),
      new Product(SKU.MBP, 'test', new Price(20))
    ]);

    expect(pricingProducts.length).toEqual(2);
    expect(pricingProducts[0].price).toEqual(new Price(0));
    expect(pricingProducts[1].price).toEqual(new Price(0));
  });

  test('should throw error if SKU does not match', () => {
    const freeAction = new FreeAction(SKU.MBP, 0.5);
    expect(() => freeAction.execute([
      new Product(SKU.VGA, 'test', new Price(20))
    ])).toThrowError('Product SKU vga does not match SKU mbp in rule action FreeAction');
  });
});
