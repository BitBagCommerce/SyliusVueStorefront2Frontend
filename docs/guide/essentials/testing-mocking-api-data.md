# Testing - Mocking api data for tests

We use Cypress for end to end testing. Cypress is a great tool for testing, it allows us to mock data, but we need to intercept api calls manually and there is a lot of them. We don't want to test our api in end to end tests, we want to test only our application. To solve this problem we created a simple solution.

:::tip Tests separation concept

VSF2 is a headless application. It means that it's frontend is separated from backend api but it highly depends on responses provided by it.

We want to separate our tests from backend api. We don't want to test our api in end to end tests. We want to test only our application. To do this **we need to mock data from api**. We can do this **by intercepting api calls** and returning mock data. This way we can test our application without backend api running.

This is important because we don't want our tests to fail when backend api fails. Backend api has it's own tests and if something breakes there it should not affect our tests.

:::

## Preparation

Before we start we need to finish our test using real backend api. This way we don't have to do anything to make tests work, at least while backend api is running. It will be used later to create mock data for our tests.

:::warning Github actions
End to end tests are run on Github automatically when merging to one of main branches. We need to make sure that our tests have mock data to pass on Github actions. Backend api is not running on Github actions therefore **it will always fail if we don't mock data**.

**To test it locally just turn off backend api and run tests** after we add mock data. If tests pass then we are good to go.
:::

Example test:

```js
import page from '../pages/factory';

context('Adding products to cart', () => {
  it(['e2e', 'happypath'], 'Should successfully add product to cart', () => {
    // Go to category page
    page.home.visit();
    page.home.header.categories.first().click();

    // Add product
    page.category.addProductToCart(0);

    // Check cart sidebar content
    page.category.header.openCartSidebar();
  });
});
```

This test is going to work only with real backend api running.

## Getting api data

To get api data in Cypress tests we can use `` command. This command is used to make http requests. It's very simple to use. You just need to pass url to your api endpoint and you will get response from this endpoint. For example:
