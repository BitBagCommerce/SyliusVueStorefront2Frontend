import Base from './base';
import { el } from './utils/element';

class Product extends Base {
  get addToCartButton(): Cypress.Chainable {
    return el('product_add-to-cart');
  }

  get decreseQuantityButton(): Cypress.Chainable {
    return el('minus-quantity-button');
  }

  get increaseQuantityButton(): Cypress.Chainable {
    return el('plus-quantity-button');
  }

  public decreaseQuantity(by = 1) {
    for (let i = 0; i < by; i++) {
      this.decreseQuantityButton.first().click();
      cy.wait(100);
    }
  }

  public increaseQuantity(by = 1) {
    for (let i = 0; i < by; i++) {
      this.increaseQuantityButton.first().click();
      cy.wait(100);
    }
  }
}

export default new Product();
