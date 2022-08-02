import { Ad } from './ad.js';
import { Checkout } from './checkout.js';
import { ads } from '../data/ads.js';
import { pricingRules } from '../data/pricingRules.js';

function main() {
  const customerId = '3';

  // It is not necessary to have param pricingRules for new Checkout() because it was already imported
  const checkout = new Checkout(pricingRules);
  checkout.customerId = customerId;

  const classicAd = new Ad(ads[0].name, ads[0].retailPrice);
  const standOutAd = new Ad(ads[1].name, ads[1].retailPrice);
  const premiumAd = new Ad(ads[2].name, ads[2].retailPrice);
  
  checkout.add(classicAd);
  checkout.add(standOutAd);
  checkout.add(premiumAd);

  return checkout.total();
}

console.log(main());

export default main;
