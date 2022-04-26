import PricingRule from './promotion/pricingRule';
import Product from './products/product';
import {CURRENCY, SKU} from './products/types';
import Price from './products/price';

class Checkout {
    private readonly _pricingRules: PricingRule[];
    private readonly _itemMap: Map<SKU, Product[]>;

    constructor(pricingRules: PricingRule[]) {
        this._pricingRules = pricingRules;
        this._itemMap = new Map<SKU, Product[]>();
    }

    public scan(item: Product) {
        const products = this._itemMap.get(item.sku);
        if (products === undefined) {
            this._itemMap.set(item.sku, [ item ]);
            return;
        }
        products.push(item);
    }

    /**
     * Find out all the pricing items according to the pricing rules
     * @param items All the items to checkout
     * @param pricingRules All the pricing rules
     *
     * @return All the pricing items, return empty array if no pricing items
     */
    private findPricingItems(items: Map<SKU, Product[]>, pricingRules: PricingRule[]): Product[] {
        const pricingItems: Product[] = [];
        pricingRules.forEach((rule) => {
            const appliedItems = rule.apply(items);
            pricingItems.push(...appliedItems);
        });
        return pricingItems;
    }

    /**
     * calculate the total price
     */
    public total(): Price {
        const unPricingItemMap = new Map(this._itemMap);
        const pricingItems = this.findPricingItems(unPricingItemMap, this._pricingRules);

        const totalPrice = new Price(0.00, CURRENCY.NZD);
        totalPrice.amount += pricingItems.reduce((sum, product) => sum += product.price.amount, 0);

        const unPricingItems = Array.from(unPricingItemMap.values()).flat();
        totalPrice.amount += unPricingItems.reduce((sum, product) => sum += product.price.amount, 0);

        return totalPrice;
    }
}

export default Checkout;
