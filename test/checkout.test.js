import { describe, it, expect } from 'vitest';
import { Ad } from '../src/ad.js';
import { ads } from '../data/ads.js';
import { add } from '../src/checkout.js';
import { pricingRules } from '../data/pricingRules';
import { Checkout } from '../src/checkout.js';

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

const test_classicAd = new Ad('Classic Ad', 5000);
const test_standOutAd = new Ad('Stand out Ad', 10000);
const test_premiumAd = new Ad('Premium Ad', 20000);

describe('Add Ads to cart', () => {
  it('it should add a new product, and set quantity as 1 when the cart does not have these ads before', () => {
    const expectedResult = [
        { name: 'Stand out Ad', retailPrice: 10000, quantity: 1 },
        { name: 'Premium Ad', retailPrice: 20000, quantity: 1 },
    ]
    const checkout = new Checkout();

    checkout.add(test_standOutAd);
    checkout.add(test_premiumAd);

    expect(checkout.adCart).toEqual(expectedResult);
  });

  it('it should add a new product, and set quantity as 2 when the customer adds 2 same ads in an empty cart', () => {
    const expectedResult = [
        { name: 'Stand out Ad', retailPrice: 10000, quantity: 2 },
    ]
    const checkout = new Checkout();

    checkout.add(test_standOutAd);
    checkout.add(test_standOutAd);

    expect(checkout.adCart).toEqual(expectedResult);
  });

  it('it should return an empty array when the customer does not add any ad to the cart', () => {
    const expectedResult = []
    const checkout = new Checkout();
    
    checkout.adCart = [];

    expect(checkout.adCart).toEqual(expectedResult);
  });
});

describe('Get Rule Price', () => {
  it('it should add a new product, and set quantity as 1 when the cart does not have these ads before', () => {
    const test_rule = {
        rulesType: 'multiPurchases',
        name: 'Classic Ad',
        quantityPriceBase: 3,
        quantityPriceCharge: 2
      }
    const test_ad = { name: 'Classic Ad', retailPrice: 10000, quantity: 3 }
    const expectedResult = 10000 * (3-1)
    const checkout = new Checkout();

    checkout.add(test_standOutAd);
    checkout.add(test_premiumAd);

    expect(checkout.getRulePrice(test_rule, test_ad)).toEqual(expectedResult);
  });
});