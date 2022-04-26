import RuleCondition from './ruleCondition';
import {RANGE} from './types';
import {SKU} from "../products/types";

describe('RuleCondition', () => {
  test('should get correct sku, range and count', () => {
    const ruleCondition = new RuleCondition(SKU.VGA, RANGE.EQUAL, 10);
    expect(ruleCondition.sku).toEqual(SKU.VGA);
    expect(ruleCondition.range).toEqual(RANGE.EQUAL);
    expect(ruleCondition.count).toEqual(10);
  });
});
