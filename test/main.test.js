import { describe, it, expect } from 'vitest';
import { Ad } from '../src/ad.js';
import { ads } from '../data/ads.js';
import { Checkout } from '../src/checkout.js';
import { pricingRules } from '../data/pricingRules';

// Example scenarios
const classicAd = new Ad(ads[0].name, ads[0].retailPrice);
const standOutAd = new Ad(ads[1].name, ads[1].retailPrice);
const premiumAd = new Ad(ads[2].name, ads[2].retailPrice);

describe('Checkout Ads (Coding exercise example scenarios)', () => {
  it('it should calculate the total price of the cart based on the retail price when non-privileged purchases ads', () => {
    function defaultCart() {
      // Customer id 999 is for a non-privileged customer
      const customerId = '999';
      const checkout = new Checkout(pricingRules);

      checkout.customerId = customerId;
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
      checkout.add(standOutAd);
      checkout.add(standOutAd);
      checkout.add(standOutAd);
      checkout.add(premiumAd);

      return checkout.total();
    }
    
    expect(axilCoffeeRoastersCart()).toBe('1294.96');
  });
});

// Unit test
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

const testPricingRules = [
  {
    customerId: '1',
    rules: [
      {
        rulesType: 'multiPurchase',
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
        rulesType: 'multiPurchase',
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
      discountedPrice: 199,
    },
    ],
  },
  {
    customerId: '4',
    rules: [
      {
        rulesType: 'multiPurchase',
        name: 'Stand out Ad',
        quantityPriceBase: 3,
        quantityPriceCharge: 2,
      },
      { rulesType: 'priceDrop', 
      name: 'Stand out Ad',
      discountedPrice: 50000,
    },
    ],
  },
];

const test_classicAd = new Ad(testAds[0].name, testAds[0].retailPrice);
const test_standOutAd = new Ad(testAds[1].name, testAds[1].retailPrice);
const test_premiumAd = new Ad(testAds[2].name, testAds[2].retailPrice);

describe('Checkout Ads', () => {
  it('it should calculate the total price of the cart based on the retail price of all ads', () => {
    function defaultCart() {
      // Customer id 999 is for unpri
      const customerId = '999';
      const checkout = new Checkout(testPricingRules);

      checkout.customerId = customerId;
      // 3*Classic Ad, 5*Stand out Ad, 2*Premium Ad, 
      checkout.add(test_classicAd);
      checkout.add(test_premiumAd);
      checkout.add(test_classicAd);
      checkout.add(test_standOutAd);
      checkout.add(test_standOutAd);
      checkout.add(test_standOutAd);
      checkout.add(test_premiumAd);
      checkout.add(test_classicAd);
      checkout.add(test_standOutAd);
      checkout.add(test_standOutAd);
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
    function testCart() {
      const customerId = '1';
      const checkout = new Checkout(testPricingRules);
      const test_cheapAd = new Ad(testAds[3].name, testAds[3].retailPrice);

      checkout.customerId = customerId;
      // 1*Cheap Ad
      checkout.add(test_cheapAd);
      return checkout.total();
    }
    
    expect(testCart()).toBe('0.01');
  });

  it('it should trigger 3 for 2 rule when customer 1 purchases more than 3 Classic Ad', () => {
    function testCart() {
      const customerId = '1';
      const checkout = new Checkout(testPricingRules);    
    
      checkout.customerId = customerId;
      // 4*Classic Ad, 5*Stand out Ad, 1*Premium Ad, 
      checkout.add(test_classicAd);
      checkout.add(test_classicAd);
      checkout.add(test_classicAd);
      checkout.add(test_classicAd);
      checkout.add(test_premiumAd);
      checkout.add(test_standOutAd);
      checkout.add(test_standOutAd);
      checkout.add(test_standOutAd);
      checkout.add(test_standOutAd);
      checkout.add(test_standOutAd);
      return checkout.total();
    }
    
    expect(testCart()).toBe('3648.47');
  });

  it('it should trigger price drop rule for customer 2 purchases when any Stand out Ads', () => {
    function testCart() {
      const customerId = '2';
      const checkout = new Checkout(testPricingRules);

      checkout.customerId = customerId;
      // 5*Stand out Ad
      checkout.add(test_standOutAd);
      checkout.add(test_standOutAd);
      checkout.add(test_standOutAd);
      checkout.add(test_standOutAd);
      checkout.add(test_standOutAd);
      return checkout.total();
    }
    
    expect(testCart()).toBe('1499.95');
  });

  it('it should trigger price drop rule for customer 3 purchases when 5 Stand out Ads', () => {
    function testCart() {
      const customerId = '3';
      const checkout = new Checkout(testPricingRules);

      checkout.customerId = customerId;
      // 5*Stand out Ad
      checkout.add(test_standOutAd);
      checkout.add(test_standOutAd);
      checkout.add(test_standOutAd);
      checkout.add(test_standOutAd);
      checkout.add(test_standOutAd);
      return checkout.total();
    }
    
    expect(testCart()).toBe('9.95');
  });

  it('it should combine 3 for 2 and price drop rule for customer 4 purchases when 4 Stand out Ads', () => {
    function testCart() {
      const customerId = '4';
      const checkout = new Checkout(testPricingRules);

      checkout.customerId = customerId;
      // 4*Stand out Ad
      checkout.add(test_standOutAd);
      checkout.add(test_standOutAd);
      checkout.add(test_standOutAd);
      checkout.add(test_standOutAd);
      return checkout.total();
    }
    
    expect(testCart()).toBe('1740.00');
  });
});
