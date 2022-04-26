## How to Run

To run the application, make sure you have node v16.14.2 and npm v8.5.0 installed on your laptop, then simply take the following steps:
* run `npm install` to install all the dependencies
* run `npm start` to start the application
* run `npm run start:dev` to start the application development with nodemon

To test the application:
* run `npm test` to run all the unit tests.
* run `npm run test:coverage` to run all the unit tests with coverage report.
* run `npm run test:dev` to run unit tests in watch mode.

## Build the Rules

The rules current is built in [PricingRuleBuilder](./src/pricingRuleBuilder.ts).
* it supports creating rule condition and specify the SKU, condition and count threshold.
* it supports creating multiple rule actions based on the rule condition, 
    * one action is to give free price to certain product based on a count ratio if rule condition is met.
    * the other action is to give discount price to certain product based on a count ratio if run condition is met.
    * rule action supports specify the SKU, count ratio and discount price
* these rule conditions and rule actions have flexibility to configure them with different values.
* these rule can have different condition and action combinations to achieve different promotion goals.
