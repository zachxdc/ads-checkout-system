import { pricingRules } from '../data/pricingRules.js';
export class Checkout {

  constructor(pricingRules) {
      this.adCart = [];
      this.pricingRules = pricingRules;
  }

  add(ad) {
    const index = this.adCart.findIndex((item) => {
    return item.name === ad.name;
  });
    // If this ad is not be added in the cart before, return -1
    if (index === -1) {
      this.adCart.push({
        ...ad,
        quantity: 1,
      });
    } else {
      // When this ad is added, the quantity increase by 1
      this.adCart[index].quantity++;
    }
  }

  getRulePrice(rule, ad) {
    let rulePrice = 0;
    switch (rule.rulesType) {
      case 'multiPurchase':
        let dealQuantity = Math.floor(ad.quantity / rule.quantityPriceBase) * rule.quantityPriceCharge;
        let restQuantity = ad.quantity % rule.quantityPriceBase;
        rulePrice = (restQuantity + dealQuantity) * ad.retailPrice;
        break;
      case 'priceDrop':
        // Ad original price vs. Ad discounted price
        rulePrice = Math.min(ad.retailPrice, rule.discountedPrice) * ad.quantity;
        break;
      default:
        break;
    }
    return rulePrice;
  };

  total() {
    let adPrice = 0;
    let totalPrice = 0;

    this.adCart.forEach((ad) => {
      adPrice = ad.retailPrice * ad.quantity;
      // For each ad
      this.pricingRules
        .filter((pricingRule) => {
          // Find pricing rules that match the specific customer
          return pricingRule.customerId === this.customerId;
        })
        .forEach((pricingRule) => {
          // Find rules match ad name
          const rules = pricingRule.rules.filter((rule) => {
            return rule.name === ad.name;
          });
          if (rules.length === 1) {
            //Original price * quantity vs. Deal total price
            adPrice = Math.min(adPrice, this.getRulePrice(rules[0], ad));
          } else if (rules.length > 1) {
            // If the customer contains multiple pricing rules
            let multiPurchasesRule;
            let priceDropRule;
            rules.forEach((rule) => {
              if (rule.rulesType === 'multiPurchase') {
                multiPurchasesRule = rule;
              }
              if (rule.rulesType === 'priceDrop') {
                priceDropRule = rule;
              }
              // Current lowest total price * quantity vs. Next price deal total price 
              adPrice = Math.min(adPrice, this.getRulePrice(rule, ad));
            });
            // Combined two deal in one checkout
            let dealQuantity = Math.floor(ad.quantity / multiPurchasesRule.quantityPriceBase) * multiPurchasesRule.quantityPriceCharge;
            let restQuantity = ad.quantity % multiPurchasesRule.quantityPriceBase;
            let combinedDeal = (dealQuantity * ad.retailPrice) + (restQuantity * priceDropRule.discountedPrice)
            // Current lowest price vs. Combined deal total price
            adPrice = Math.min(adPrice, combinedDeal);
          }
        });
      totalPrice += adPrice;
    });

    let result = (totalPrice / 100)
    // If there is no item in the cart, or result is an integer, or only has 1 decimal
    // Round up as 2 decimals for normal price format
    if ((result === 0) || (Number.isInteger(result)) ||(result.toString().split(".")[1].length < 2)) {
      result = result.toFixed(2);
    } else {
      result = result.toString();
    }
    return result;
  }
}
