import { SKU } from './types';
import Price from './price';

class Product {
    private readonly _sku: SKU;
    private _name: string;
    private _price: Price;

    constructor(sku: SKU, name: string, price: Price) {
        this._sku = sku;
        this._name = name;
        this._price = price;
    }

    public get sku(): SKU {
        return this._sku;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get price(): Price {
        return this._price;
    }

    public set price(price: Price) {
        this._price = price;
    }
}

export default Product;