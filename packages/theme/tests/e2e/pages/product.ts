import Base from './base';

class Product extends Base {
  get addToCartButton(): Cypress.Chainable {
    return cy.el('product_add-to-cart');
  }

  get decreseQuantityButton(): Cypress.Chainable {
    return cy.el('minus-quantity-button');
  }

  get increaseQuantityButton(): Cypress.Chainable {
    return cy.el('plus-quantity-button');
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
}

export default new Product();
