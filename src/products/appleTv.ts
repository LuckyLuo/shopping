import Product from './product';
import {SKU} from './types';
import Price from './price';

class AppleTv extends Product {
    constructor() {
        super(SKU.ATV, 'Apple TV', new Price(109.50));
    }
}

export default AppleTv;
