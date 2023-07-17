import product from './product';
import productModal from './components/product-modal';

class Category {
  get products(): Cypress.Chainable {
    return cy.el('category-product-card', 'a');
  }

  get addToCartButton(): Cypress.Chainable {
    return cy.vsfUiEl('product-add-icon');
  }

  public addProductToCart(id = 0, quantity = 1, typeQuantity = false): void {
    this.addToCartButton.eq(id).click();
    productModal.modalAddToCartButton.first().should('be.visible');
    if (typeQuantity) {
      product.quantityInput.type(`{selectall}${quantity}`).wait(200);
      product.confirmQuantityButton.click().wait(200);
    } else {
      product.increaseQuantity(quantity - 1);
    }
    product.quantityInput.should('have.value', `${quantity}`);
    productModal.modalAddToCartButton.first().click();
  }
}

export default new Category();
