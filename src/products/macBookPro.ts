import Product from './product';
import {SKU} from './types';
import Price from './price';

class MacBookPro extends Product {
    constructor() {
        super(SKU.MBP, 'MacBook Pro', new Price(1399.99));
    }
}

export default MacBookPro;
