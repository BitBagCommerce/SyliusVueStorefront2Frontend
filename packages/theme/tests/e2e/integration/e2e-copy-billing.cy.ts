import page from '../pages/factory';

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

      // Mocking API responses
      // cy.intercept('POST', '/api/sylius/addAddress', (req) => {});
      cy.interceptGql('getMinimalProduct', 'e2e-getMinimalProduct.json');
      cy.interceptGql('getCategory', 'e2e-getCategory.json');
      cy.interceptGql('createCart', 'e2e-createCart.json');
      cy.interceptGql('getCart', 'e2e-getCartEmpty.json');
      cy.interceptGql('getFirstProductId', 'e2e-getFirstProductId.json');
      cy.interceptGql('getProductAttribute', 'e2e-getProductAttribute.json');
      cy.interceptGql('getCountries', 'e2e-getCountries.json');
      cy.interceptGql('addToCart', 'e2e-addToCart.json');
      cy.interceptGql('addAddress', 'e2e-addAddress.json');
      cy.interceptGql(
        'getProductNotFiltered',
        'e2e-getProductNotFiltered.json'
      );

      // Add product to cart
      page.home.visit();
      page.home.header.categories.first().click();
      cy.interceptGql('getCart', 'e2e-getCartWithProduct.json');
      page.category.addProductToCart();
      page.product.header.openCart();
      page.cart.goToCheckoutButton.click();

      // Fill in billing form
      page.checkout.billing.heading.should('be.visible');
      cy.wait(1000);
      page.checkout.billing.fillForm(data.customer);
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
      // TODO: Uncomment when state is added to the form
      // page.checkout.shipping.state.should('have.value', data.customer.address.billing.state);
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
