import VgaAdapter from './vgaAdapter';
import {SKU} from './types';
import Price from "./price";

describe('VgaAdapter', () => {
  test('should get correct sku, name and price', () => {
    const vgaAdapter = new VgaAdapter();
    expect(vgaAdapter.sku).toEqual(SKU.VGA);
    expect(vgaAdapter.name).toEqual('VGA adapter');
    expect(vgaAdapter.price).toEqual(new Price(30.00));
  });
});
