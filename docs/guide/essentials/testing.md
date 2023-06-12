# Testing

On this project, we only run e2e (end to end) tests. We use [Cypress]('https://www.cypress.io/') for writing our test.

## Overview

All files related to writing tests are located in `packages/theme/tests/e2e` directory, for this guide, I will only explain `pages`, `fixtures`, and `integration` folders, you can learn more about the rest from [Cypress docs]('https://docs.cypress.io/guides/references/configuration').

## `/pages`

Here we define all the pages and page elements we want our tests to target, all elements here are defined in the form of class definitions:

```ts
import Header from './components/header';

// class defining of our page
class Home {
  // header element on our home page element defined in a form of a getter, we will be able to access this element through home object
  get header() {
    return Header;
  }

  // method definition, we will also be able to access it through final home object
  visit(): Cypress.Chainable {
    return cy.visit('/').clearCookies();
  }
}

// export of initialize home object, so we can access it later
export default new Home();
```

You probably can notice that we are importing `Header` from `./components/header`. Bigger elements should be placed in the separate files inside of `/components` folder, files there will look similar to ones in `pages`. Inside of `header.ts` file:

```ts
import { el } from '../utils/element';

class Header {
  get cart(): Cypress.Chainable {
    // wrapper around cy.get
    return el('app-header-cart');
  }

  get categories(): Cypress.Chainable {
    // cy.get allows us to select elements from DOM for testing
    return cy.get('[data-e2e="app-header"]');
  }

  get category() {
    return {
      women: () => el('app-header-url_women'),
      men: () => el('app-header-url_men'),
    };
  }

  openCart(): Cypress.Chainable {
    const click = ($el) => $el.click();
    return this.cart.pipe(click).should(() => {
      expect(Cypress.$('[data-e2e="sidebar-cart"]')).to.exist;
    });
  }
}

export default new Header();
```

As you can see above we are using some predefined functions from Cypress, for the list of available functions go [here]('https://docs.cypress.io/api/table-of-contents').

One function I'd like to describe here would be `cy.get()` the first parameter of this function is a CSS selector string, pretty much the same one you would put inside of `document.querySelector()` or `$()`. `cy.get()` function allows us to target specified DOM elements and chain other Cypress functions after e.g. `cy.get('[data-e2e="sidebar-cart"]').should('be.visible')`.

We also have `el()` function which wraps provided strings so this `el('sidebar-cart', 'input')` would be equivalent to this `cy.get('[data-e2e="sidebar-cart"] input')`.

After defining our pages we have to put them inside the `factory.ts` file, here is how this file should look like:

```ts
// imports for our page elements
import category from './category';
import checkout from './checkout';
import cart from './components/cart-sidebar';
import home from './home';
import product from './product';

// class for our main page object
class Page {
  // definition for our page element, later on this element will be accessible through page object e.g. page.cart
  get cart() {
    return cart;
  }

  get category() {
    return category;
  }

  get checkout() {
    return checkout;
  }

  get home() {
    return home;
  }

  get product() {
    return product;
  }
}

export default new Page();
```

## `/fixtures`

In this folder we put our fixtures, by that I mean mock data we would use while tasting for example while filling forms. Example `.json` file from fixtures folder:

```json
{
  "customer": {
    "firstName": "John",
    "lastName": "Doe",
    "address": {
      "shipping": {
        "streetName": "1 VueStorefront Rd.",
        "apartment": "23",
        "city": "Los Angeles",
        "state": "California",
        "country": "United States",
        "zipcode": "45678",
        "phone": "123456789",
        "email": "john.doe{random}@example.com"
      },
      "billing": {
        "streetName": "1 VueStorefront Rd.",
        "apartment": "23",
        "city": "Los Angeles",
        "state": "California",
        "country": "United States",
        "zipcode": "45678",
        "phone": "123456789",
        "email": "john.doe{random}@example.com"
      }
    }
  }
}
```

## `/integration`

Finally we have the integration folder, this is the folder in which we will write our testing steps. Files written here should have `.cy.ts` file extension, here is example test file:

```ts
// import of our main page object containing our predefined elements
import page from '../pages/factory';

// before allows us to execute a function before we start our testing
before(() => {
  // here we are loading our fixtures and assigning them
  cy.fixture('test-data/e2e-place-order').then((fixture) => {
    cy.fixtures = {
      data: fixture,
    };
  });
});

// defining a suite which can contain multiple tests
context('Order placement', () => {
  // defining a test
  it(['e2e', 'happypath'], 'Should successfully place an order', () => {
    const data = cy.fixtures.data;

    // testing steps executed one after another by calling Cypress predefined methods
    page.home.visit();
    page.home.header.categories.first().click();
    page.category.products.first().click();
    page.product.addToCartButton.click();
    // calling openCart method which we defined on header object
    page.product.header.openCart();
    page.cart.goToCheckoutButton.click();
    page.checkout.billing.heading.should('be.visible');
    page.checkout.billing.fillForm(data.customer);
    page.checkout.billing.continueToShippingButton.click();
    page.checkout.shipping.heading.should('be.visible');
    page.checkout.shipping.fillForm(data.customer);
    page.checkout.shipping.selectShippingButton.click();
    page.checkout.shipping.shippingMethods.first().click();
    page.checkout.shipping.continueToPaymentButton.click();
    page.checkout.payment.paymentMethods.first().click();
    page.checkout.payment.makeAnOrderButton.click();
    page.checkout.thankyou.heading.should('be.visible');
  });
});
```

As you can see we can access our predefined elements through `page` object just by putting a `.` to go deeper the object tree, and calling Cypress methods at the end to execute our testing steps. I think most of Cypress provided methods are self-explanatory, but to learn more you can go [here]('https://docs.cypress.io/guides/core-concepts/interacting-with-elements')

## Running tests

To run your tests you just need to run `yarn test`.
