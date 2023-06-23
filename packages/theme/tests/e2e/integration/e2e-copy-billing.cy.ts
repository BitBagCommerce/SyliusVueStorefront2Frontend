import page from '../pages/factory';

before(() => {
  cy.fixture('test-data/e2e-place-order').then((fixture) => {
    cy.fixtures = {
      data: fixture,
    };
  });
});

context('Copy billing data to shipping form', () => {
  it(['e2e', 'happypath'], 'Should successfully copy data from billing form', () => {
    const data = cy.fixtures.data;

    page.home.visit();
    page.home.header.categories.first().click();
    cy.get('button.sf-product-card__add-button').first().click();
    cy.get('body').then((body) => {
      if (body.find('button.sf-add-to-cart__button').length > 0) {
        cy.get('button.sf-add-to-cart__button').first().click();
      }
    });
    page.product.header.openCart();
    page.cart.goToCheckoutButton.click();
    page.checkout.billing.heading.should('be.visible');
    page.checkout.billing.fillForm(data.customer);
    page.checkout.billing.continueToShippingButton.click();
    page.checkout.shipping.heading.should('be.visible');

    // Copy billing address
    cy.get('[data-testid="copyBillingAddress"] > label').click();

    // Testing results
    page.checkout.shipping.firstName.should('have.value', data.customer.firstName);
    page.checkout.shipping.lastName.should('have.value', data.customer.lastName);
    page.checkout.shipping.streetName.should('have.value', data.customer.address.billing.streetName);
    page.checkout.shipping.city.should('have.value', data.customer.address.billing.city);
    page.checkout.shipping.country.should('not.have.value', '');
    page.checkout.shipping.state.should('have.value', data.customer.address.billing.state);
    page.checkout.shipping.zipcode.should('have.value', data.customer.address.billing.zipcode);
    page.checkout.shipping.phone.should('have.value', data.customer.address.billing.phone);
  });
});