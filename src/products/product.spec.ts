import Product from "./Product";
import {SKU} from "./types";
import Price from "./price";

describe('Product', () => {
  test('should get correct SKU, name and price', () => {
    const product = new Product(SKU.VGA, 'test', new Price(33));
    expect(product.sku).toEqual(SKU.VGA);
    expect(product.name).toEqual('test');
    expect(product.price).toEqual(new Price(33));
  });

  test('should update name and price', () => {
    const product = new Product(SKU.VGA, 'test', new Price(33));
    expect(product.sku).toEqual(SKU.VGA);
    expect(product.name).toEqual('test');
    expect(product.price).toEqual(new Price(33));

    product.name = 'test2';
    product.price = new Price(44);

    expect(product.sku).toEqual(SKU.VGA);
    expect(product.name).toEqual('test2');
    expect(product.price).toEqual(new Price(44));
  });
});
