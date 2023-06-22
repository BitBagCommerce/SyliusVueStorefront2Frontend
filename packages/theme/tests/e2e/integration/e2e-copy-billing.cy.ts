import page from '../pages/factory';

before(() => {
  cy.fixture('test-data/e2e-copy-billing').then((fixture) => {
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
    cy.get('[data-testid="copyBillingAddress"] > label').click();
    page.checkout.shipping.firstName.should('have.value', data.customer.firstName);
    // this.lastName.type(customer.lastName);
    // this.streetName.type(customer.address.shipping.streetName);
    // this.city.type(customer.address.shipping.city);
    // this.country.select(customer.address.shipping.country);
    // this.state.type(customer.address.shipping.state);
    // this.zipcode.type(customer.address.shipping.zipcode);
    // this.phone.type(customer.address.shipping.phone);
  });
});
