import {RANGE} from "./types";
import {SKU} from "../products/types";

class RuleCondition {
    readonly sku: SKU;
    readonly range: RANGE;
    readonly count: number;

    constructor(sku: SKU, range: RANGE, count: number) {
        this.sku = sku;
        this.range = range;
        this.count = count;
    }
}

export default RuleCondition;