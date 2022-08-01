import { describe, it, expect } from 'vitest';
import { Ad } from '../src/ad.js';
import { ads } from '../data/ads.js';
import { Checkout } from '../src/checkout.js';
import { pricingRules } from '../data/pricingRules';

// Example scenarios
describe('Checkout Ads (Coding exercise example scenarios)', () => {
  it('it should calculate the total price of the cart based on the retail price when non-privileged purchases ads', () => {
    function defaultCart() {
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
    function myerCart() {
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
    
    expect(myerCart()).toBe('1294.96');
  });
});

const testingAds = [
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
    
      const classicAd = new Ad(testingAds[0].name, testingAds[0].retailPrice);
      const standOutAd = new Ad(testingAds[1].name, testingAds[1].retailPrice);
      const premiumAd = new Ad(testingAds[2].name, testingAds[2].retailPrice);
      
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
    function defaultCart() {
      const customerId = '999';
      const checkout = new Checkout(pricingRules);
      checkout.customerId = customerId;
    
      return checkout.total();
    }
    
    expect(defaultCart()).toBe('0.00');
  });

  it('it should trigger 3 for 2 rule when SecondBite purhcases more than 3 Classic Ad', () => {
    function secondBiteCart() {
      //SecondBite's customer id is 1
      const customerId = '1';
      const checkout = new Checkout(pricingRules);
      checkout.customerId = customerId;
    
      const classicAd = new Ad(testingAds[0].name, testingAds[0].retailPrice);
      const standOutAd = new Ad(testingAds[1].name, testingAds[1].retailPrice);
      const premiumAd = new Ad(testingAds[2].name, testingAds[2].retailPrice);
    
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
    function secondBiteCart() {
      //Axil Coffee Roasters's customer id is 2
      const customerId = '2';
      const checkout = new Checkout(pricingRules);
      checkout.customerId = customerId;
    
      const classicAd = new Ad(testingAds[0].name, testingAds[0].retailPrice);
      const standOutAd = new Ad(testingAds[1].name, testingAds[1].retailPrice);
      const premiumAd = new Ad(testingAds[2].name, testingAds[2].retailPrice);
    
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
    
    expect(secondBiteCart()).toBe('2094.41');
  });

  it('it should trigger 5 for 4 rule for Stand out Ads, and NOT trigger lower price rule for Premium Ads when Myer purchases ads', () => {
    function secondBiteCart() {
      //Myer's customer id is 3
      const customerId = '3';
      const checkout = new Checkout(pricingRules);
      checkout.customerId = customerId;
    
      const classicAd = new Ad(testingAds[0].name, testingAds[0].retailPrice);
      const standOutAd = new Ad(testingAds[1].name, testingAds[1].retailPrice);
      const premiumAd = new Ad(testingAds[2].name, testingAds[2].retailPrice);
    
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
    
    expect(secondBiteCart()).toBe('3074.46');
  });
});