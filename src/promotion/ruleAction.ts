import Product from "../products/product";
import {SKU} from "../products/types";

abstract class RuleAction {
    private readonly _sku: SKU;
    private readonly _name: string;
    private readonly _countRatio: number;

    protected constructor(name: string, sku: SKU, countRatio: number) {
        this._name = name;
        this._sku = sku;
        this._countRatio = countRatio;
    }

    public get sku() {
        return this._sku;
    }

    public get name() {
        return this._name;
    }

    public get countRatio() {
        return this._countRatio;
    }

    protected validate(product: Product): void | Error {
        if (product.sku !== this.sku) {
            throw new Error(`Product SKU ${product.sku} does not match SKU ${this.sku} in rule action ${this.name}`);
        }
    }

    /**
     * Execute the rule action to pricing items
     * @param products The products before pricing
     *
     * @return The products after pricing
     */
    public execute(products: Product[]): Product[] {
        const pricingProducts: Product[] = [];
        products.forEach((p) => {
           this.validate(p);
           pricingProducts.push(this.pricing(p));
        });

        return pricingProducts;
    }

    /**
     * Pricing the single product
     * @param product The product before pricing
     *
     * @return The product after pricing
     */
    abstract pricing(product: Product): Product;
}

export default RuleAction;