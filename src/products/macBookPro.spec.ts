import MacBookPro from './macBookPro';
import {SKU} from './types';
import Price from "./price";

describe('MacBookPro', () => {
  test('should get correct sku, name and price', () => {
    const macBookPro = new MacBookPro();
    expect(macBookPro.sku).toEqual(SKU.MBP);
    expect(macBookPro.name).toEqual('MacBook Pro');
    expect(macBookPro.price).toEqual(new Price(1399.99));
  });
});
