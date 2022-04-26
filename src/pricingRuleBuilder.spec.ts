import PricingRuleBuilder from "./pricingRuleBuilder";
import PricingRule from "./promotion/pricingRule";
import RuleCondition from "./promotion/ruleCondition";
import {SKU} from "./products/types";
import {RANGE} from "./promotion/types";
import FreeAction from "./promotion/freeAction";

describe('PricingRuleBuilder', () => {
  test('should build current rules', () => {
    const rules = PricingRuleBuilder.build();
    expect(rules.length).toEqual(3);
  });

  test('should detect rules which has duplicated SKU used in the rule conditions', () => {
    expect(() => PricingRuleBuilder.validate([
        new PricingRule(new RuleCondition(SKU.VGA, RANGE.EQUAL, 3), []),
        new PricingRule(new RuleCondition(SKU.VGA, RANGE.GREATER_THAN, 2), []),
        new PricingRule(new RuleCondition(SKU.MBP, RANGE.EQUAL, 4), [
            new FreeAction(SKU.VGA, 1)
        ]),
    ])).toThrowError('Each product can only be used once in the rule conditions')
  });

    test('should detect rules which has duplicated SKU used in the rule actions', () => {
        expect(() => PricingRuleBuilder.validate([
            new PricingRule(new RuleCondition(SKU.VGA, RANGE.EQUAL, 3), []),
            new PricingRule(new RuleCondition(SKU.MBP, RANGE.EQUAL, 5), [
                new FreeAction(SKU.VGA, 1),
                new FreeAction(SKU.IPD, 1/5),
                new FreeAction(SKU.VGA, 1/5)
            ]),
        ])).toThrowError('Each product can only be used once in one rule actions');
    });
});
