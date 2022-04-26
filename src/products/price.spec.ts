import Price from "./price";
import {CURRENCY} from "./types";

describe('Price', () => {
  test('should get correct amount and currency', () => {
    const price = new Price(33, CURRENCY.NZD);
    expect(price.amount).toEqual(33);
    expect(price.currency).toEqual(CURRENCY.NZD);
  });

  test('should use default currency', () => {
    const price = new Price(44);
    expect(price.amount).toEqual(44);
    expect(price.currency).toEqual(CURRENCY.NZD);
  });

  test('should update amount and currency correctly', () => {
    const price = new Price(44);
    expect(price.amount).toEqual(44);
    expect(price.currency).toEqual(CURRENCY.NZD);

    price.amount = 55;
    price.currency = CURRENCY.AUD;

    expect(price.amount).toEqual(55);
    expect(price.currency).toEqual(CURRENCY.AUD);
  });

  test('should display price as string correctly', () => {
    const price = new Price(44);
    expect(price.toString()).toEqual('$44');
  });

  test('should throw error if price amount is invalid', () => {
    expect(() => new Price(-44)).toThrowError('Invalid price amount -44');
  });
});
