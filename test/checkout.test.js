import { describe, it, expect } from 'vitest';
import { Ad } from '../src/ad.js';
import { Checkout } from '../src/checkout.js';

const test_standOutAd = new Ad('Stand out Ad', 10000);
const test_premiumAd = new Ad('Premium Ad', 20000);

describe('Add ads to cart', () => {
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

describe('Get product price when it has price rule', () => {
  it('it should use 3 for 2 rule and return 30000 when customer purchase the ad', () => {
    const test_rule = {
        rulesType: 'multiPurchase',
        name: 'Classic Ad',
        quantityPriceBase: 3,
        quantityPriceCharge: 2
      }
    let test_ad = { name: 'Classic Ad', retailPrice: 10000, quantity: 4 }
    let expectedResult = test_ad.retailPrice * (test_ad.quantity - 1)
    const checkout = new Checkout();

    expect(checkout.getRulePrice(test_rule, test_ad)).toEqual(expectedResult);
  });

  it('it should use price drop rule and return 300 when customer purchase the ad', () => {
    const test_rule = {
        rulesType: 'priceDrop',
        name: 'Stand Out Ad',
        discountedPrice: 100,
      }
    let test_ad = { name: 'Stand Out Ad', retailPrice: 10000, quantity: 3 }
    let expectedResult = test_rule.discountedPrice * 3
    const checkout = new Checkout();

    expect(checkout.getRulePrice(test_rule, test_ad)).toEqual(expectedResult);
  });

  it('it should return lower price when discounted price is higher than retail price', () => {
    const test_rule = {
        rulesType: 'priceDrop',
        name: 'Stand Out Ad',
        discountedPrice: 10000,
      }
    let test_ad = { name: 'Stand Out Ad', retailPrice: 1, quantity: 3 }
    let expectedResult = test_ad.retailPrice * 3
    const checkout = new Checkout();

    expect(checkout.getRulePrice(test_rule, test_ad)).toEqual(expectedResult);
  });
});