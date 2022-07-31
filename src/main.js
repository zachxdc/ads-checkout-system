import { Ad } from './ad.js';
import { Checkout } from './checkout.js';
import { ad } from '../data/ad.js';
import { pricingRules } from '../data/pricingRules.js';

function main() {
  const customerId = '1';
  const checkout = new Checkout(pricingRules);
  checkout.customerId = customerId;

  const classicAd = new Ad(ad[0].name, ad[0].retailPrice);
  const standOutAd = new Ad(ad[1].name, ad[1].retailPrice);
  const premiumAd = new Ad(ad[2].name, ad[2].retailPrice);

  // checkout.add(standOutAd);
  // checkout.add(premiumAd);
  checkout.add(classicAd);
  checkout.add(classicAd);
  checkout.add(classicAd);

  return checkout.total();
}

console.log(main());
