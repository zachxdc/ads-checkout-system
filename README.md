# Ads checkout system

## Description

The repository's project is for customers to calculate the total price when purchasing one or multiple ads. 

Currently system has 3 kinds of ads:
| Name | Description | Retail Price |
|:---- |:----------- | ------------:|
| Classic Ad | Offers the most basic level of advertisement | $269.99 |
| Stand out Ad | Allows advertisers to use a company logo and use a longer presentation text | $322.99 |
| Premium Ad | Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility | $394.99 |

There is a small number of privileged customers are eligible to checkout the ads with special pricing rules:
1. SecondBite
    * Gets a **3** for **2** deal on **Classic Ads**

2. Axil Coffee Roasters
    * Gets a discount on **Standout Ads** where the price drops to **$299.99** per ad

3. MYER
    * Gets a **5 for 4** deal on **Stand out Ads**
    * Gets a discount on **Premium Ads** where the price drops to **$389.99** per ad 

## Prerequisite

- node v16.15.1+ (Download link: https://nodejs.org/en/download/)
- npm v8.11.0+ (Installation instruction: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Installation

1. Clone the project: 

   `git clone https://github.com/zachxdc/ads-checkout-system`

2. Enter the project folder: 

   `ads-checkout-system`

3. Install packages that project dependencies: 

   `npm ci`

## Running instruction

- Configure customer id:
    You can simply change the customerId value by editing this line, `const customerId = '2';` in `src/main.js`.
    You can find all customer ids in `data/customers.js`.

- Configure checkout ads:
    You can update ads for checkout by editing `main()` in `src/main.js`.
    You can find all customer ids in `data/customers.js`.
    To add a Classic Ad: `checkout.add(classicAd);`.
    To add a Stand out Ad: `checkout.add(standOutAd);`.
    To add a Premium Ad: `checkout.add(premiumAd);`.

- Run with npm script:

    `npm start`

- Run with node:

    `node src/main.js`

- Run all unit tests in this directory:

    `npm run test`

## File Structure

    .
    ├── data
    │   ├── ads.js
    │   ├── customers.js
    │   ├── pricingRules.js
    ├── src
    │   ├── ad.js
    │   ├── checkout.js
    │   ├── index.js
    │   ├── main.js
    ├── test
    │   ├── main.test.py
    ├── package-lock.json
    ├── package.json
    └── README.md

## Solution design concept
1. The program is to calculte the total price for all products in a cart, so the main I/O file, `PriceCalculator.py` is create to output the total price for each cart

2. The product base price and products in the cart are saved in the JSONfile, so create the `readDatafile.py` to load json file

3. Item has its product type, options, and base price. Each item may have different options and different base prices. (For example, a white large hoodie and a white small hoodie may have different prices.) To solve the problem the function in `basePrice.py` file is to get all prices and all options for the product, then match them to get the exact base price

4.  The function in `cart.py` is to calculate total price for one product in the cart and total price of all products in the cart

5. Apply the built in unittest for automation test 
