export const pricingRules = [
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
      { 
        rulesType: 'priceDrop', 
        name: 'Premium Ad', 
        discountedPrice: 38999,
      },
      { 
        rulesType: 'thresholdSale', 
        threshold: 2,
        thresholdType: 'over',
        name: 'Classic Ad', 
        discountedPrice: 24999,
      },
    ],
  },
  {
    customerId: '4', 
    rules: [
      { rulesType: 'thresholdSale', 
        threshold: 3,
        thresholdType: 'over',
        name: 'Premium Ad', 
        discountedPrice: 37999,
      },
    ],
  },
];
