import page from '../pages/factory';
import apiData from '../fixtures/api/e2e-copy-billing';

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
      // Visit homepage
      cy.interceptApi('getMinimalProduct', apiData.getMinimalProduct[0]);
      cy.interceptApi('getCategory', apiData.getCategory[0]);
      cy.interceptApi('createCart', apiData.createCart[0]);
      cy.interceptApi('getCart', apiData.getCart[0]);
      page.home.visit();

      // Go to category page
      cy.interceptApi(
        'getProductNotFiltered',
        apiData.getProductNotFiltered[0]
      );
      cy.interceptApi('getMinimalProduct', apiData.getMinimalProduct[1]);
      cy.interceptApi('getFirstProductId', apiData.getFirstProductId[0]);
      cy.interceptApi('getProductAttribute', apiData.getProductAttribute[0]);
      page.home.header.categories.first().click();

      // Add product to cart
      cy.interceptApi('addToCart', apiData.addToCart[0]);
      page.category.addProductToCart();

      // Go to checkout
      page.category.header.openCartSidebar();

      cy.interceptApi('getCart', apiData.getCart[1]);
      cy.interceptApi('getFirstProductId', apiData.getFirstProductId[1]);
      cy.interceptApi('getCountries', apiData.getCountries[0]);
      page.cartSidebar.goToCheckoutButton.click();

      // Fill in billing form
      page.checkout.billing.heading.should('be.visible');
      cy.wait(1000);
      page.checkout.billing.fillForm(data.customer);

      cy.interceptApi('getCart', apiData.getCart[2]).as('getCart2');

      cy.interceptApi('addAddress', apiData.addAddress[0]);
      cy.interceptApi('getFirstProductId', apiData.getFirstProductId[2]);
      cy.interceptApi('getCountries', apiData.getCountries[1]);
      page.checkout.billing.continueToShippingButton.click();
      cy.wait('@getCart2').then(() => {
        cy.interceptApi('getCart', apiData.getCart[3]);
      });

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
