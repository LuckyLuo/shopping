import Checkout from './checkout';
import PricingRule from './promotion/pricingRule';
import AppleTv from './products/appleTv';
import VgaAdapter from './products/vgaAdapter';
import PricingRuleBuilder from "./pricingRuleBuilder";

const pricingRules: PricingRule[] = PricingRuleBuilder.build();
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

const totalPrice = checkout.total();
console.log(`SKUs Scanned: ${cart.map((item) => item.sku).join(',')} Total expected: ${totalPrice.toString()}`);
