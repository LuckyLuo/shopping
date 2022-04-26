import Product from "../products/product";
import {SKU} from "../products/types";
import RuleAction from "./ruleAction";
import Price from "../products/price";

class DiscountAction extends RuleAction {
    private readonly _discountedPrice: Price;
    constructor(sku: SKU, discountedPrice: Price, countRatio: number) {
        super('DiscountAction', sku, countRatio);
        this._discountedPrice = discountedPrice;
    }

    public get discountedPrice() {
        return this._discountedPrice;
    }

    pricing(product: Product): Product {
        const pricingProduct = Object.assign(Object.create(product), product);
        pricingProduct.price = this._discountedPrice;
        return pricingProduct;
    }
}

export default DiscountAction;