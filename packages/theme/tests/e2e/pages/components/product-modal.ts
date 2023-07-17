class ProductModal {
  get decreseQuantityButton(): Cypress.Chainable {
    return cy.el('minus-quantity-button');
  }

  get increaseQuantityButton(): Cypress.Chainable {
    return cy.el('plus-quantity-button');
  }

  get confirmQuantityButton(): Cypress.Chainable {
    return cy.el('confirm-quantity-button');
  }

  get quantityInput(): Cypress.Chainable {
    return cy.el('quantity-input');
  }

  public decreaseQuantity(by = 1) {
    for (let i = 0; i < by; i++) {
      this.decreseQuantityButton.first().click();
    }
  }

  public increaseQuantity(by = 1) {
    for (let i = 0; i < by; i++) {
      this.increaseQuantityButton.first().click();
    }
  }

  get modalAddToCartButton(): Cypress.Chainable {
    return cy.el('modal__add-to-cart');
  }
}

export default new ProductModal();
