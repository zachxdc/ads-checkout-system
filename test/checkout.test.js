import { describe, it, expect } from 'vitest';
import { Ad } from '../src/ad.js';
import { Checkout } from '../src/checkout.js';
import { pricingRules } from '../data/pricingRules';

const testAds = [
  {
    "name": "Classic Ad",
    "description": "Offers the most basic level of advertisement",
    "retailPrice": 4599
  },
  {
    "name": "Stand out Ad",
    "description": "Allows advertisers to use a company logo and use a longer presentation text",
    "retailPrice": 62000
  },
  {
    "name": "Premium Ad",
    "description": "Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility",
    "retailPrice": 41050
  }
]

// Unit test
describe('Checkout Ads', () => {
  it('it should calculate the total price of the cart based on the retail price of all ads', () => {
    function defaultCart() {
      // Customer id 999 is for unpri
      const customerId = '999';
      const checkout = new Checkout(pricingRules);
      checkout.customerId = customerId;
    
      const classicAd = new Ad(testAds[0].name, testAds[0].retailPrice);
      const standOutAd = new Ad(testAds[1].name, testAds[1].retailPrice);
      const premiumAd = new Ad(testAds[2].name, testAds[2].retailPrice);
      
      // 3*Classic Ad, 5*Stand out Ad, 2*Premium Ad, 
      checkout.add(classicAd);
      checkout.add(premiumAd);
      checkout.add(classicAd);
      checkout.add(standOutAd);
      checkout.add(standOutAd);
      checkout.add(standOutAd);
      checkout.add(premiumAd);
      checkout.add(classicAd);
      checkout.add(standOutAd);
      checkout.add(standOutAd);
      return checkout.total();
    }
    
    expect(defaultCart()).toBe('4058.97');
  });
});