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

  total() {
    const totalPrice = this.adCart.reduce(
      (total, ad) => total + (ad.price * ad.quantity * this.pricingRules) / 100,
      0
    );
    return totalPrice;
  }

  // total() {
  //   const totalPrice = 0;
  //   adCart.forEach(ad => {
  //     rules.forEach(rule => {
  //     })
  //   })
  //   return totalPrice;
  // }
}