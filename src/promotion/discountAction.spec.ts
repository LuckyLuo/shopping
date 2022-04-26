import DiscountAction from './discountAction';
import {SKU} from "../products/types";
import Price from "../products/price";
import Product from "../products/product";

describe('DiscountAction', () => {
  test('should get correct sku, name, discount price and count ratio', () => {
    const discountAction = new DiscountAction(SKU.VGA, new Price(22), 0.5);
    expect(discountAction.sku).toEqual(SKU.VGA);
    expect(discountAction.name).toEqual('DiscountAction');
    expect(discountAction.discountedPrice).toEqual(new Price(22));
    expect(discountAction.countRatio).toEqual(0.5);
  });

  test('should pricing product correctly', () => {
    const discountAction = new DiscountAction(SKU.MBP, new Price(10), 0.5);
    const pricingProduct = discountAction.pricing(new Product(SKU.MBP, 'test', new Price(20)));
    expect(pricingProduct.sku).toEqual(SKU.MBP);
    expect(pricingProduct.name).toEqual('test');
    expect(pricingProduct.price).toEqual(new Price(10));
  });

  test('should pricing products correctly', () => {
    const discountAction = new DiscountAction(SKU.MBP, new Price(10), 0.5);
    const pricingProducts = discountAction.execute([
        new Product(SKU.MBP, 'test', new Price(20)),
        new Product(SKU.MBP, 'test', new Price(20))
    ]);

    expect(pricingProducts.length).toEqual(2);
    expect(pricingProducts[0].price).toEqual(new Price(10));
    expect(pricingProducts[1].price).toEqual(new Price(10));
  });

  test('should throw error if SKU does not match', () => {
    const discountAction = new DiscountAction(SKU.MBP, new Price(10), 0.5);
    expect(() => discountAction.execute([
      new Product(SKU.VGA, 'test', new Price(20))
    ])).toThrowError('Product SKU vga does not match SKU mbp in rule action DiscountAction');
  });
});
