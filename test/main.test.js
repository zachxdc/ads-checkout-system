import { describe, it, expect } from 'vitest';
import { Ad } from '../src/ad.js';
import { ad } from '../data/ad.js';
import { Checkout } from '../src/checkout.js';
import { pricingRules } from '../data/pricingRules';

describe('privileged customer purchases the ads', () => {
  it('It should calculate the total price of the cart based on the retail price of ad', () => {
    function defaultCart() {
      const customerId = '999';
      const checkout = new Checkout(pricingRules);
      checkout.customerId = customerId;
    
      const classicAd = new Ad(ad[0].name, ad[0].retailPrice);
      const standOutAd = new Ad(ad[1].name, ad[1].retailPrice);
      const premiumAd = new Ad(ad[2].name, ad[2].retailPrice);
    
      checkout.add(classicAd);
      checkout.add(standOutAd);
      checkout.add(premiumAd);
      return checkout.total();
    }
    
    expect(defaultCart()).toBe('987.97');
  });
});

describe('SecondBite purchases the ads', () => {
  it('It should trigger 3 for 2 rule when SecondBite purhcases more than 3 Classic Ad', () => {
    function secondBiteCart() {
      //SecondBite's customer id is 1
      const customerId = '1';
      const checkout = new Checkout(pricingRules);
      checkout.customerId = customerId;
    
      const classicAd = new Ad(ad[0].name, ad[0].retailPrice);
      const premiumAd = new Ad(ad[2].name, ad[2].retailPrice);
    
      checkout.add(classicAd);
      checkout.add(classicAd);
      checkout.add(classicAd);
      checkout.add(premiumAd);
      return checkout.total();
    }
    
    expect(secondBiteCart()).toBe('934.97');
  });
});

describe('Axil Coffee Roasters purchases the ads', () => {
  it('It should trigger price drop rule for Axil Coffee Roasters purchases Stand out Ad', () => {
    function myerCart() {
      //Axil Coffee Roasters id is 2
      const customerId = '2';
      const checkout = new Checkout(pricingRules);
      checkout.customerId = customerId;
    
      const standOutAd = new Ad(ad[1].name, ad[1].retailPrice);
      const premiumAd = new Ad(ad[2].name, ad[2].retailPrice);
    
      checkout.add(standOutAd);

      return checkout.total();
    }
    
    expect(myerCart()).toBe('299.99');
  });
});