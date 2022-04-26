import AppleTv from './appleTv';
import {SKU} from './types';
import Price from "./price";

describe('AppleTv', () => {
  test('should get correct sku, name and price', () => {
    const appleTv = new AppleTv();
    expect(appleTv.sku).toEqual(SKU.ATV);
    expect(appleTv.name).toEqual('Apple TV');
    expect(appleTv.price).toEqual(new Price(109.50));
  });
});
