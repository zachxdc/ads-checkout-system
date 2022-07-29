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
