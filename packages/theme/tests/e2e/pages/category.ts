import product from './product';

class Category {
  get products(): Cypress.Chainable {
    return cy.el('category-product-card', 'a');
  }

  get addToCartButton(): Cypress.Chainable {
    return cy.vsfUiEl('product-add-icon');
  }

  get modalAddToCartButton(): Cypress.Chainable {
    return cy.el('modal__add-to-cart');
  }

  public addProductToCart(id = 0, quantity = 1, typeQuantity = false): void {
    this.addToCartButton.eq(id).click();
    cy.get('body').then((body) => {
      if (body.find('button.sf-add-to-cart__button').length > 0) {
        if (typeQuantity) {
          product.quantityInput.type(`{selectall}${quantity}`).wait(200);
          product.confirmQuantityButton.click().wait(200);
        } else {
          product.increaseQuantity(quantity - 1);
        }
        product.quantityInput.should('have.value', `${quantity}`);
        this.modalAddToCartButton.first().click();
      }
    });
  }
}

export default new Category();
