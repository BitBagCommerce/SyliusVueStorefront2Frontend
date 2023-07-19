import page from '../pages/factory';
import {
  getMinimalProduct,
  getCategory,
  createCart,
  getCart,
  getFirstProductId,
  getProductAttribute,
  getCountries,
  addToCart,
  addAddress,
  getProductNotFiltered,
} from '../fixtures/api/e2e-api-responses';

import { getCartModifications } from '../fixtures/api/e2e-api-responses-modifications';

before(() => {
  cy.fixture('test-data/e2e-place-order').then((fixture) => {
    cy.fixtures = {
      data: fixture,
    };
  });
});

context('Copy billing data to shipping form', () => {
  it(
    ['e2e', 'happypath'],
    'Should successfully copy data from billing form',
    () => {
      const data = cy.fixtures.data;
      let currentCart = getCart.empty;

      // Mocking API responses
      cy.interceptApi('getMinimalProduct', getMinimalProduct.minimalProducts);
      cy.interceptApi('getCategory', getCategory.categories);
      cy.interceptApi('createCart', createCart.cart);
      cy.interceptApi('getCart', getCart.empty);
      cy.interceptApi('getFirstProductId', getFirstProductId.firstProductId);
      cy.interceptApi(
        'getProductAttribute',
        getProductAttribute.productAttributes
      );
      cy.interceptApi('getCountries', getCountries.countries);
      cy.interceptApi('addToCart', addToCart.singleProduct);
      cy.interceptApi('addAddress', addAddress.billing);
      cy.interceptApi(
        'getProductNotFiltered',
        getProductNotFiltered.productsNotFiltered
      );

      // Add product to cart
      page.home.visit();
      page.home.header.categories.first().click();

      cy.wait(10).then(() => {
        currentCart = getCartModifications.addProduct(currentCart);
        cy.interceptApi('getCart', currentCart);
      });

      page.category.addProductToCart();
      page.category.header.openCartSidebar();
      page.cartSidebar.goToCheckoutButton.click();

      // Fill in billing form
      page.checkout.billing.heading.should('be.visible');
      cy.wait(1000);
      page.checkout.billing.fillForm(data.customer);

      cy.wait(10).then(() => {
        currentCart = getCartModifications.setBillingAddress(
          currentCart,
          addAddress.billing.billingAddress
        );
        cy.interceptApi('getCart', currentCart);
      });

      cy.interceptApi('getCart', getCart.billingSumbitted);
      page.checkout.billing.continueToShippingButton.click();

      // Copy billing address
      page.checkout.shipping.heading.should('be.visible');
      cy.wait(1000);
      page.checkout.shipping.copyBillingAddress.click();

      // Testing results
      page.checkout.shipping.firstName.should(
        'have.value',
        data.customer.firstName
      );
      page.checkout.shipping.lastName.should(
        'have.value',
        data.customer.lastName
      );
      page.checkout.shipping.streetName.should(
        'have.value',
        data.customer.address.billing.streetName
      );
      page.checkout.shipping.city.should(
        'have.value',
        data.customer.address.billing.city
      );
      page.checkout.shipping.country.should(
        'have.value',
        data.customer.address.billing.country
      );
      page.checkout.shipping.provinceName.should(
        'have.value',
        data.customer.address.billing.provinceName
      );
      page.checkout.shipping.zipcode.should(
        'have.value',
        data.customer.address.billing.zipcode
      );
      page.checkout.shipping.phone.should(
        'have.value',
        data.customer.address.billing.phone
      );
    }
  );
});
