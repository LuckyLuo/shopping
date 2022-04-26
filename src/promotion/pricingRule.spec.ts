import PricingRule from "./pricingRule";
import AppleTv from "../products/appleTv";
import VgaAdapter from "../products/vgaAdapter";
import RuleCondition from "./ruleCondition";
import {SKU} from "../products/types";
import {RANGE} from "./types";
import FreeAction from "./freeAction";
import DiscountAction from "./discountAction";
import Price from "../products/price";

describe('PricingRule', () => {
  describe('For buy X and get Y free rule', () => {
    const buyXFreeYRule = new PricingRule(
        new RuleCondition(SKU.ATV, RANGE.EQUAL, 6),
        [
          new FreeAction(SKU.ATV, 1/3),
          new FreeAction(SKU.VGA, 1/6)
        ]
    );

    test('should pricing the products correctly', () => {
      const items = new Map([
        [ SKU.ATV, [
          new AppleTv(),
          new AppleTv(),
          new AppleTv(),
          new AppleTv(),
          new AppleTv(),
          new AppleTv(),
          new AppleTv(),
          new AppleTv(),
          new AppleTv(),
        ]],
        [ SKU.VGA, [
          new VgaAdapter(),
          new VgaAdapter()
        ]]
      ]);

      const pricingItems = buyXFreeYRule.apply(items);
      expect(pricingItems.length).toEqual(3);
      const unPricingATV = items.get(SKU.ATV);
      const unPricingVga = items.get(SKU.VGA);

      expect(unPricingATV).not.toBeUndefined();
      expect(unPricingVga).not.toBeUndefined();
      if (unPricingATV !== undefined) {
        expect(unPricingATV.length).toEqual(7);
      }
      if (unPricingVga !== undefined) {
        expect(unPricingVga.length).toEqual(1);
      }
    });
  });

  describe('For buy X get discount rule', () => {
    const buyXGetDiscountRule = new PricingRule(
        new RuleCondition(SKU.ATV, RANGE.GREATER_THAN, 3),
        [
          new DiscountAction(SKU.ATV, new Price(3), 1),
        ]
    );

    test('should pricing the products correctly', () => {
      const items = new Map([
        [ SKU.ATV, [
          new AppleTv(),
          new AppleTv(),
          new AppleTv(),
          new AppleTv(),
        ]],
        [ SKU.VGA, [
          new VgaAdapter(),
          new VgaAdapter()
        ]]
      ]);

      const pricingItems = buyXGetDiscountRule.apply(items);
      expect(pricingItems.length).toEqual(4);
      const unPricingATV = items.get(SKU.ATV);
      const unPricingVga = items.get(SKU.VGA);

      expect(unPricingATV).toBeUndefined();
      expect(unPricingVga).not.toBeUndefined();
      if (unPricingVga !== undefined) {
        expect(unPricingVga.length).toEqual(2);
      }
    });
  });
});
