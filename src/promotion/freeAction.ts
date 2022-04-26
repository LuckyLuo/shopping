import Product from "../products/product";
import {SKU} from "../products/types";
import RuleAction from "./ruleAction";

class FreeAction extends RuleAction {
    constructor(sku: SKU, countRatio: number) {
        super('FreeAction', sku, countRatio);
    }

    pricing(product: Product): Product {
        const pricingProduct = Object.assign(Object.create(product), product);
        pricingProduct.price.amount = 0;
        return pricingProduct;
    }
}

export default FreeAction;