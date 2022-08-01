import { describe, it, expect } from 'vitest';
import { Ad } from '../src/ad.js';
import { ads } from '../data/ads.js';
import { Checkout } from '../src/checkout.js';
import { pricingRules } from '../data/pricingRules';

// Example scenarios
describe('Checkout Ads (Coding exercise example scenarios)', () => {
  it('it should calculate the total price of the cart based on the retail price when non-privileged purchases ads', () => {
    function defaultCart() {
      // Customer id 999 is for a non-privileged customer
      const customerId = '999';
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
    
    expect(defaultCart()).toBe('987.97');
  });

  it('it should trigger 3 for 2 rule when SecondBite purhcases more than 3 Classic Ad', () => {
    function secondBiteCart() {
      //SecondBite's customer id is 1
      const customerId = '1';
      const checkout = new Checkout(pricingRules);
      checkout.customerId = customerId;
    
      const classicAd = new Ad(ads[0].name, ads[0].retailPrice);
      const premiumAd = new Ad(ads[2].name, ads[2].retailPrice);
    
      checkout.add(classicAd);
      checkout.add(classicAd);
      checkout.add(classicAd);
      checkout.add(premiumAd);
      return checkout.total();
    }
    
    expect(secondBiteCart()).toBe('934.97');
  });

  it('it should trigger price drop rule for Axil Coffee Roasters purchases Stand out Ad', () => {
    function axilCoffeeRoastersCart() {
      //Axil Coffee Roasters id is 2
      const customerId = '2';
      const checkout = new Checkout(pricingRules);
      checkout.customerId = customerId;
    
      const standOutAd = new Ad(ads[1].name, ads[1].retailPrice);
      const premiumAd = new Ad(ads[2].name, ads[2].retailPrice);
    
      checkout.add(standOutAd);
      checkout.add(standOutAd);
      checkout.add(standOutAd);
      checkout.add(premiumAd);

      return checkout.total();
    }
    
    expect(axilCoffeeRoastersCart()).toBe('1294.96');
  });
});

const testAds = [
  {
    "name": "Classic Ad",
    "description": "Offers the most basic level of advertisement",
    "retailPrice": 4599,
  },
  {
    "name": "Stand out Ad",
    "description": "Allows advertisers to use a company logo and use a longer presentation text",
    "retailPrice": 62000,
  },
  {
    "name": "Premium Ad",
    "description": "Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility",
    "retailPrice": 41050,
  },
  {
    "name": "Cheap Ad",
    "description": "A cheap ad only cost one cent",
    "retailPrice": 1,
  }
]

export const testPricingRules = [
  {
    customerId: '1',
    rules: [
      {
        rulesType: 'multiPurchases',
        name: 'Classic Ad',
        quantityPriceBase: 3,
        quantityPriceCharge: 2,
      },
    ],
  },
  {
    customerId: '2',
    rules: [
      { rulesType: 'priceDrop', 
        name: 'Stand out Ad', 
        discountedPrice: 29999,
      },
    ],
  },
  {
    customerId: '3',
    rules: [
      {
        rulesType: 'multiPurchases',
        name: 'Stand out Ad',
        quantityPriceBase: 5,
        quantityPriceCharge: 4,
      },
      { rulesType: 'priceDrop', 
        name: 'Premium Ad', 
        discountedPrice: 38999,
      },
      { rulesType: 'priceDrop', 
      name: 'Stand out Ad',
      discountedPrice: 189,
    },
    ],
  },
];

// Unit test
describe('Checkout Ads', () => {
  it('it should calculate the total price of the cart based on the retail price of all ads', () => {
    function defaultCart() {
      // Customer id 999 is for unpri
      const customerId = '999';
      const checkout = new Checkout(testPricingRules);
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

  it('it should return 0.00 when cart is empty', () => {
    function emptyCart() {
      const customerId = '999';
      const checkout = new Checkout(testPricingRules);
      checkout.customerId = customerId;
    
      return checkout.total();
    }
    
    expect(emptyCart()).toBe('0.00');
  });

  it('it should return 0.01 when any customer buy a cheap ad', () => {
    function smallAmountCart() {
      //Axil Coffee Roasters's customer id is 2
      const customerId = '1';
      const checkout = new Checkout(testPricingRules);
      checkout.customerId = customerId;
    
      const cheapAd = new Ad(testAds[3].name, testAds[3].retailPrice);
    
      // 1*Cheap Ad
      checkout.add(cheapAd);
      return checkout.total();
    }
    
    expect(smallAmountCart()).toBe('0.01');
  });

  it('it should trigger 3 for 2 rule when SecondBite purhcases more than 3 Classic Ad', () => {
    function secondBiteCart() {
      //SecondBite's customer id is 1
      const customerId = '1';
      const checkout = new Checkout(testPricingRules);
      checkout.customerId = customerId;
    
      const classicAd = new Ad(testAds[0].name, testAds[0].retailPrice);
      const standOutAd = new Ad(testAds[1].name, testAds[1].retailPrice);
      const premiumAd = new Ad(testAds[2].name, testAds[2].retailPrice);
    
      // 4*Classic Ad, 5*Stand out Ad, 1*Premium Ad, 
      checkout.add(classicAd);
      checkout.add(classicAd);
      checkout.add(classicAd);
      checkout.add(classicAd);
      checkout.add(premiumAd);
      checkout.add(standOutAd);
      checkout.add(standOutAd);
      checkout.add(standOutAd);
      checkout.add(standOutAd);
      checkout.add(standOutAd);
      return checkout.total();
    }
    
    expect(secondBiteCart()).toBe('3648.47');
  });

  it('it should trigger price drop rule for Axil Coffee Roasters purchases Stand out Ad', () => {
    function axilCoffeeRoastersCart() {
      //Axil Coffee Roasters's customer id is 2
      const customerId = '2';
      const checkout = new Checkout(testPricingRules);
      checkout.customerId = customerId;
    
      const classicAd = new Ad(testAds[0].name, testAds[0].retailPrice);
      const standOutAd = new Ad(testAds[1].name, testAds[1].retailPrice);
      const premiumAd = new Ad(testAds[2].name, testAds[2].retailPrice);
    
      // 4*Classic Ad, 5*Stand out Ad, 1*Premium Ad, 
      checkout.add(classicAd);
      checkout.add(classicAd);
      checkout.add(classicAd);
      checkout.add(classicAd);
      checkout.add(premiumAd);
      checkout.add(standOutAd);
      checkout.add(standOutAd);
      checkout.add(standOutAd);
      checkout.add(standOutAd);
      checkout.add(standOutAd);
      return checkout.total();
    }
    
    expect(axilCoffeeRoastersCart()).toBe('2094.41');
  });
});