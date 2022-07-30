export const pricingRules = [
	{	"customerId":"1",
		"rules":{
			"multiPurchases":{   
        "name":"Classic AD",
				"quantityPriceBase":"3", 
				"quantityPriceCharge": "2", 
			}
    }
	},
  {	"customerId":"2",
    "rules":{
      "priceDrop":{
          "name":"Stand out Ads",
          "discountedPrice":"29999", 
      }
    }
  },
  {	"customerId":"3",
    "rules":{
      "multiPurchases":{
          "name":"Stand out Ads",
          "quantityPriceBase":"5", 
          "quantityPriceCharge": "4", 
      },
      "priceDrop":{   
          "rulesType": "priceDrop",
          "name":"Premium Ads",
          "discountedPrice": "38999", 
      },
    }
  },
]
