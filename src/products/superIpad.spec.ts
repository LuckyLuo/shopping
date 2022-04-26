import SuperIpad from './superIpad';
import {SKU} from './types';
import Price from "./price";

describe('SuperIpad', () => {
  test('should get correct sku, name and price', () => {
    const superIpad = new SuperIpad();
    expect(superIpad.sku).toEqual(SKU.IPD);
    expect(superIpad.name).toEqual('Super iPad');
    expect(superIpad.price).toEqual(new Price(549.99));
  });
});
