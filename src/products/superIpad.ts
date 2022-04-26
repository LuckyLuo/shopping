import Product from './product';
import {SKU} from './types';
import Price from './price';

class SuperIpad extends Product {
    constructor() {
        super(SKU.IPD, 'Super iPad', new Price(549.99));
    }
}

export default SuperIpad;
