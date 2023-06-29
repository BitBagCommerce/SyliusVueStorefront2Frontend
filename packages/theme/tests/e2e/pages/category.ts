import { el } from './utils/element';

class Category {
  get products(): Cypress.Chainable {
    return el('category-product-card', 'a');
  }

  public addProductToCart(id = 0): void {
    cy.get('button.sf-product-card__add-button').eq(id).click();
    cy.get('body').then((body) => {
      if (body.find('button.sf-add-to-cart__button').length > 0) {
        cy.get('button.sf-add-to-cart__button').first().click();
      }
    });
  }
}

export default new Category();
