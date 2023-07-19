import quantitySelector from './quantity-selector';

class CartSidebar {
  get goToCheckoutButton(): Cypress.Chainable {
    return cy.el('go-to-checkout-btn');
  }

  get quantitySelector() {
    return quantitySelector;
  }
}

export default new CartSidebar();
