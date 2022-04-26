import Product from './product';
import {SKU} from './types';
import Price from './price';

class VgaAdapter extends Product {
    constructor() {
        super(SKU.VGA, 'VGA adapter', new Price(30.00));
    }
}

export default VgaAdapter;
