import PricingRule from "./promotion/pricingRule";
import Price from "./products/price";
import Checkout from "./checkout";
import AppleTv from "./products/appleTv";
import VgaAdapter from "./products/vgaAdapter";
import PricingRuleBuilder from "./pricingRuleBuilder";
import SuperIpad from "./products/superIpad";
import MacBookPro from "./products/macBookPro";

describe('Checkout', () => {
  const pricingRules: PricingRule[] = PricingRuleBuilder.build();

  test('should calculate the correct total price when buy 3 apple tvs and pay 2 only', () => {
    const checkout = new Checkout(pricingRules);

    const cart = [
      new AppleTv(),
      new AppleTv(),
      new AppleTv(),
      new VgaAdapter()
    ];

    cart.forEach((item) => {
      checkout.scan(item);
    });

    expect(checkout.total().amount).toEqual(249.00);
  });

  test('should calculate the correct total price when buy more than 4 super ipads', () => {
    const checkout = new Checkout(pricingRules);
    const cart = [
      new AppleTv(),
      new SuperIpad(),
      new SuperIpad(),
      new AppleTv(),
      new SuperIpad(),
      new SuperIpad(),
      new SuperIpad()
    ];

    cart.forEach((item) => {
      checkout.scan(item);
    });

    expect(checkout.total().amount).toEqual(2718.95);
  });

  test('should calculate the correct total price when buy one macbook pro bundled with a free vag adapter', () => {
    const checkout = new Checkout(pricingRules);
    const cart = [
      new MacBookPro(),
      new VgaAdapter(),
      new SuperIpad()
    ];

    cart.forEach((item) => {
      checkout.scan(item);
    });

    expect(checkout.total().amount).toEqual(1949.98);
  });

  test('should calculate the correct total price when buy multiple different products', () => {
    const checkout = new Checkout(pricingRules);
    const cart = [
      new SuperIpad(),
      new MacBookPro(),
      new VgaAdapter(),
      new VgaAdapter(),
      new SuperIpad(),
      new SuperIpad(),
      new AppleTv(),
      new AppleTv(),
      new SuperIpad(),
      new SuperIpad(),
      new SuperIpad(),
      new SuperIpad(),
      new SuperIpad(),
      new AppleTv(),
      new AppleTv(),
      new AppleTv(),
      new SuperIpad(),
      new SuperIpad(),
    ];

    cart.forEach((item) => {
      checkout.scan(item);
    });

    expect(checkout.total().amount).toEqual(6867.89);
  });
});
