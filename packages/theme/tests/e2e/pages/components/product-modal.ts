import quantitySelector from './quantity-selector';
import variantsSelector from './variants-selector';

class ProductModal {
  get addToCartButton(): Cypress.Chainable {
    return cy.el('modal__add-to-cart');
  }

  get quantitySelector() {
    return quantitySelector;
  }

  get variantsSelector() {
    return variantsSelector;
  }
}

export default new ProductModal();
