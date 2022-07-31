export const pricingRules = [
  {
    customerId: '1',
    rules: [
      {
        rulesType: 'multiPurchases',
        name: 'Classic AD',
        quantityPriceBase: 3,
        quantityPriceCharge: 2,
      },
    ],
  },
  {
    customerId: '2',
    rules: [
      { rulesType: 'priceDrop', 
        name: 'Stand out Ads', 
        discountedPrice: 29999 },
    ],
  },
  {
    customerId: '3',
    rules: [
      {
        rulesType: 'multiPurchases',
        name: 'Stand out Ads',
        quantityPriceBase: 5,
        quantityPriceCharge: 4,
      },
      { rulesType: 'priceDrop', 
        name: 'Classic AD', 
        discountedPrice: 1 },
    ],
  },
];