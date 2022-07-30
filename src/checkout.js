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
    const productPrice = 0;
    const totalPrice = 0;
    this.adCart.forEach(ad => {
      // console.log("addddd", ad);
      pricingRules.forEach(pricingRule => {
        // console.log(a, 'aaa');
        console.log(ad.name, 'adname');
        if((ad.name === pricingRule.rules.multiPurchases.name) && (this.customerId === pricingRule.customerId)){
          switch (pricingRule.rulesType) {
            case "multiPurchases":
              let fullPriceQuantity = ad.quantity % pricingRule.rules.quantityPriceBase
              let dealQuantity =  parseInt(ad.quantity / pricingRule.rules.quantityPriceBase) * pricingRule.rules.quantityPriceBase
              productPrice = (fullPriceQuantity + dealQuantity) * ad.price
              //let 不可打折的商品数量 = 总数 % 打折门槛
              //let 可打折的商品数量 = 取整（总数 / 价格门槛） * 满减后实际收费的个数
              // 总价 = （不可打折的商品数量 + 可打折的商品数量）* 价格
              console.log(productPrice, 'PP');
              break;

            case "priceDrop":

              break

            default:
              
              break;
          }
          // totalPrice = totalPrice + productPrice;
        }
      })
    })
    return totalPrice;
  }
}