import Base from './base';
import quantitySelector from './components/quantity-selector';
import variantsSelector from './components/variants-selector';

class Product extends Base {
  get path() {
    return '/p/1/everyday-white-basic-t-shirt?t_shirt_size=t_shirt_size_s';
  }

  get addToCartButton(): Cypress.Chainable {
    return cy.el('product_add-to-cart');
  }

  get quantitySelector() {
    return quantitySelector;
  }

  get variantsSelector() {
    return variantsSelector;
  }
}

export default new Product();
