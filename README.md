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

1. node v16.15.1+ (Download link: https://nodejs.org/en/download/)

2. npm v8.11.0+ (Installation instruction: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Installation

1. Clone the project: 
   `git clone https://github.com/zachxdc/ads-checkout-system`

2. Enter the project folder: 
   `ads-checkout-system`

3. Install packages that project dependencies: 
   `npm ci`

## Running instruction

1. Configure customer id:
    You can simply change the customerId value by editing this line, `const customerId = '2';` in `src/main.js`.
    You can find all customer ids in `data/customers.js`.

2. Configure checkout ads:
    You can update ads for checkout by editing `main()` in `src/main.js`.
    You can find all customer ids in `data/customers.js`.
    To add a Classic Ad: `checkout.add(classicAd);`.
    To add a Stand out Ad: `checkout.add(standOutAd);`.
    To add a Premium Ad: `checkout.add(premiumAd);`.

3. Run with npm script:
    `npm start`

4. Run with node:
    `node src/main.js`

5. Run all unit tests in this repository:
    `npm run test`

6. Run specific unit test:
    `npm run [test_file_path]`

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
1. The design of the project has followed the separation of the logic and data, so users can easily expand new users, new ads, and new pricing rules later while not affect existed functions.

2. Attributes are stored in a key-value(object) manner so it will easily add, delete or update the attributes in the future. This also provides convenience for expanding the function in the future

3. Code splitting for the different functions. It will be more flexible when a part of the algorithm needs to be updated. It will also be easier to maintain because people do not need to read the long codes which be painful to understand.

4. When a customer has multiple pricing rules for a product, the program will assign the cheapest deal plan to check out and it will not allow to hybrid of the two deals for a checkout.
e.g. Classic Ad is $100. The customer, David has promotions for Classic Ad with discounted price is $1, and a 5 for 4 offer. In the case when David purchases 10 Classic Ads, the price is $1 * 10 = $10, NOT (10 / 5) * 4 * 100 = $800.

## Limitation
1. There is no validation on the data or params used for functions, which means that the program cannot handle inappropriate input.

