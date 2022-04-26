import PricingRule from './promotion/pricingRule';
import RuleCondition from "./promotion/ruleCondition";
import {RANGE} from "./promotion/types";
import {SKU} from "./products/types";
import FreeAction from "./promotion/freeAction";
import DiscountAction from "./promotion/discountAction";
import Price from "./products/price";

class PricingRuleBuilder {
    static validate(rules: PricingRule[]): void | Error {
        const skuSet = new Set(rules.map(rule => rule.ruleCondition.sku));
        if(skuSet.size !== rules.length) {
            throw new Error('Each product can only be used once in the rule conditions')
        }

        for(let rule of rules) {
            const skuSet = new Set(rule.ruleActions.map(action => action.sku));
            if (skuSet.size !== rule.ruleActions.length) {
                throw new Error('Each product can only be used once in one rule actions');
            }
        }
    }

    static build(): PricingRule[] {
        // we're going to have a 3 for 2 deal on Apple TVs.
        // For example, if you buy 3 Apple TVs, you will pay the price of 2 only
        const buyXFreeXRule = new PricingRule(
            new RuleCondition(SKU.ATV, RANGE.EQUAL, 3),
            [
                new FreeAction(SKU.ATV, 1/3)
            ]
        );

        // the brand new Super iPad will have a bulk discounted applied,
        // where the price will drop to $499.99 each, if someone buys more than 4
        const bulkDiscountedRule = new PricingRule(
            new RuleCondition(SKU.IPD, RANGE.GREATER_THAN, 4),
            [
                new DiscountAction(SKU.IPD, new Price(499.99), 1)
            ]
        );

        // we will bundle in a free VGA adapter free of charge with every MacBook Pro sold
        const bundleSaleRule = new PricingRule(
            new RuleCondition(SKU.MBP, RANGE.EQUAL, 1),
            [
                new FreeAction(SKU.VGA, 1)
            ]
        );

        const rules = [
            buyXFreeXRule,
            bulkDiscountedRule,
            bundleSaleRule
        ];

        PricingRuleBuilder.validate(rules);
        return rules;
    };
}

export default PricingRuleBuilder;