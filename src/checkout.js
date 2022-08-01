import { pricingRules } from '../data/pricingRules.js';
export class Checkout {

  constructor(pricingRules) {
      this.adCart = [];
      this.pricingRules = pricingRules;
  }

  add(ad) {
    console.log(ad)
    const index = this.adCart.findIndex((item) => {
    return item.name === ad.name;
  });
    // If this kind of ad is not be added in the cart before, return -1
    if (index === -1) {
      this.adCart.push({
        ...ad,
        quantity: 1,
      });
    } else {
      // When this kind of ad is added, the quantity increase by 1
      this.adCart[index].quantity++;
    }
  }

  getRulePrice(rule, ad) {
    let retailPrice = 0;
    switch (rule.rulesType) {
      case 'multiPurchases':
        let fullPriceQuantity = ad.quantity % rule.quantityPriceBase;
        let dealQuantity = Math.floor(ad.quantity / rule.quantityPriceBase) * rule.quantityPriceCharge;
        retailPrice = (fullPriceQuantity + dealQuantity) * ad.price;
        break;
      case 'priceDrop':
        retailPrice = Math.min(ad.price, rule.discountedPrice) * ad.quantity;
        break;
      default:
        break;
    }
    return retailPrice;
  };

  total() {
    let productPrice = 0;
    let totalPrice = 0;

    this.adCart.forEach((ad) => {
      productPrice = ad.price * ad.quantity;
      // For each ad
      pricingRules
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
            // If the customer has only 1 pricing rule
            productPrice = Math.min(productPrice, this.getRulePrice(rules[0], ad));
          } else if (rules.length > 1) {
            // If the customer contains multiple pricing rules
            let multiPurchasesRule;
            let priceDropRule;
            rules.forEach((rule) => {
              if (rule.rulesType === 'multiPurchases') {
                multiPurchasesRule = rule;
              }
              if (rule.rulesType === 'priceDrop') {
                priceDropRule = rule;
              }
              // Compare the 
              console.log(productPrice, 'ppp');
              console.log(this.getRulePrice(rule, ad), 'ttt');
              productPrice = Math.min(productPrice, this.getRulePrice(rule, ad));
              console.log(productPrice, 'PPPP2')
            });
            // priceDrop & multiPurchases
            let fullPriceQuantity = ad.quantity % multiPurchasesRule.quantityPriceBase;
            let dealQuantity = Math.floor(ad.quantity / multiPurchasesRule.quantityPriceBase) * multiPurchasesRule.quantityPriceCharge;
            productPrice = Math.min(productPrice, dealQuantity * ad.price + fullPriceQuantity * priceDropRule.discountedPrice);
          }
        });
      totalPrice += productPrice;
    });

    let result = (totalPrice / 100)
    //If the numbner of decimal is 0 or 1, or their is no item in the cart, make it as 2 for normal price format
    if ((result === 0) || (result.toString().split(".")[1].length < 2)) {
      result = result.toFixed(2);
    } else {
      result = result.toString();
    }
    return result;
  }
}
