import Product from "../products/product";
import {SKU} from "../products/types";
import {RANGE} from "./types";
import RuleCondition from "./ruleCondition";
import RuleAction from "./ruleAction";

class PricingRule {
    private readonly _ruleCondition: RuleCondition;
    private readonly _ruleActions: RuleAction[];
    constructor(ruleCondition: RuleCondition, ruleActions: RuleAction[]) {
        this._ruleCondition = ruleCondition;
        this._ruleActions = ruleActions;
    }

    public get ruleCondition(): RuleCondition {
        return this._ruleCondition;
    }

    public get ruleActions(): RuleAction[] {
        return this._ruleActions;
    }

    /**
     * Get the all the matched items according to the rule condition
     * @param items The product items grouped by SKU
     * @private
     *
     * @return All the matched products
     */
    private _getMatchedItems(items: Map<SKU, Product[]>): Product[] {
        const products = items.get(this.ruleCondition.sku);
        if(products === undefined) {
            return [];
        }

        const matchedItems = [...products];
        switch (this.ruleCondition.range) {
            case RANGE.EQUAL:
                if (matchedItems.length >= this.ruleCondition.count) {
                    const reminder = matchedItems.length % this.ruleCondition.count;
                    return matchedItems.slice(0, matchedItems.length - reminder);
                }
                break;
            case RANGE.GREATER_THAN:
                if (matchedItems.length > this.ruleCondition.count) {
                    return matchedItems;
                }
                break;
        }

        return [];
    }

    /**
     * Get all the action items according to the SKU and item count of a rule's action
     * @param sku The SKU of the product to action on
     * @param count The count of the action items
     * @param items The product items grouped by SKU
     * @private
     *
     * @return All the action items
     */
    private _getActionItems(sku: SKU, count: number, items: Map<SKU, Product[]>): Product[] {
        const products = items.get(sku);
        if(products === undefined) {
            return [];
        }

        const actionItems = [...products];
        if (actionItems.length > count) {
            const unActionedItems = actionItems.slice((actionItems.length - count) * -1);
            items.set(sku, unActionedItems);
            return actionItems.slice(0, count);
        }

        items.delete(sku);
        return actionItems;
    }

    /**
     * Apply the rule onto the product items
     * @param items The product items grouped by SKU
     *
     * @return All the pricing items
     */
    public apply(items: Map<SKU, Product[]>): Product[] {
        const matchedItems = this._getMatchedItems(items);
        const pricingItems: Product[] = [];
        this.ruleActions.forEach((rule: RuleAction) => {
            const sku = rule.sku !== this.ruleCondition.sku ? rule.sku : this.ruleCondition.sku;
            const actionItemCount = Math.floor(matchedItems.length * rule.countRatio);
            const actionItems = this._getActionItems(sku, actionItemCount, items);
            pricingItems.push(...rule.execute(actionItems));
        });
        return pricingItems;
    }
}

export default PricingRule;