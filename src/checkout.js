export class Checkout {
  constructor(pricingRules = 0.9)
  {
    this.adCart = [];
    this.pricingRules = pricingRules;
  }

  add(ad) {
    this.adCart.push(ad);
  }

  total() {
    const totalPrice = this.adCart.reduce((total, ad) => total + (ad.price * this.pricingRules)/100, 0);
    return totalPrice
  }
}
