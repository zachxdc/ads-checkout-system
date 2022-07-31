export class Checkout {
  constructor(pricingRules)
  {
    this.adCart = [];
    this.adQuantity = [];
    this.pricingRules = pricingRules;
  }

  add(ad) {
    this.adCart.push(ad);
    this.adQuantity[ad.name] += 1;
  }

  total() {
    const totalPrice = this.adCart.reduce((total, ad) => total + (ad.price * this.pricingRules)/100, 0);
    return totalPrice
  }
}
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
    if (index === -1) {
      // not in
      this.adCart.push({
        ...ad,
        quantity: 1,
      });
    } else {
      // in
      this.adCart[index].quantity++;
    }
  }

  // total() {
  //   const totalPrice = this.adCart.reduce(
  //     (total, ad) => total + (ad.price * ad.quantity * this.pricingRules) / 100,
  //     0
  //   );
  //   return totalPrice;
  // }

  total() {
    let productPrice = -1;
    let totalPrice = 0;
    const min = (a, b) => {
      return a < b ? a : b;
    };
    this.adCart.forEach((ad) => {
      productPrice = ad.price * ad.quantity;
      // for each ad
      pricingRules
        .filter((pricingRule) => {
          // find rules match customerId
          return pricingRule.customerId === this.customerId;
        })
        .forEach((pricingRule) => {
          // find rules match ad name
          const rules = pricingRule.rules.filter((rule) => {
            return rule.name === ad.name;
          });
          // find min price
          const getRulePrice = (rule) => {
            let retPrice = -1;
            switch (rule.rulesType) {
              case 'multiPurchases':
                let fullPriceQuantity = ad.quantity % rule.quantityPriceBase;
                let dealQuantity =
                  Math.floor(ad.quantity / rule.quantityPriceBase) *
                  rule.quantityPriceCharge;
                retPrice = (fullPriceQuantity + dealQuantity) * ad.price;
                break;
              case 'priceDrop':
                retPrice = min(ad.price, rule.discountedPrice) * ad.quantity;
                break;
              default:
                break;
            }
            return retPrice;
          };
          if (rules.length === 1) {
            // one rule match
            productPrice = min(productPrice, getRulePrice(rules[0]));
          } else if (rules.length > 1) {
            // multiple rules match
            let multiPurchasesRule;
            let priceDropRule;
            rules.forEach((rule) => {
              if (rule.rulesType === 'multiPurchases')
                multiPurchasesRule = rule;
              if (rule.rulesType === 'priceDrop') priceDropRule = rule;
              productPrice = min(productPrice, getRulePrice(rule));
            });
            // priceDrop & multiPurchases
            let fullPriceQuantity =
              ad.quantity % multiPurchasesRule.quantityPriceBase;
            let dealQuantity =
              Math.floor(ad.quantity / multiPurchasesRule.quantityPriceBase) *
              multiPurchasesRule.quantityPriceCharge;
            productPrice = min(
              productPrice,
              dealQuantity * ad.price +
                fullPriceQuantity * priceDropRule.discountedPrice
            );
          }
        });
      totalPrice += productPrice;
    });
    return totalPrice;
  }
}
