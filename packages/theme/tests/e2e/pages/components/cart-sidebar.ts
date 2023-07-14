class Cart {
  get goToCheckoutButton(): Cypress.Chainable {
    return cy.el('go-to-checkout-btn');
  }
}

export default new Cart();
