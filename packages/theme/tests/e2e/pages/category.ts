import Base from './base';
import productModal from './components/product-modal';

class Category extends Base {
  get path() {
    return '/c/category/t-shirts';
  }

  get products(): Cypress.Chainable {
    return cy.el('category-product-card', 'a');
  }

  get addToCartButton(): Cypress.Chainable {
    return cy.vsfUiEl('product-add-icon');
  }

  public addProductToCart(
    id = 0,
    quantity = 1,
    typeQuantity = false,
    selectVariants?: {
      selectorId: number;
      variant: number | string;
      expectedValue?: string;
    }[]
  ) {
    // Open product modal
    this.addToCartButton.eq(id).click();
    // Handle adding product to cart in modal
    productModal.addProductToCart(quantity, typeQuantity, selectVariants);
  }
}

export default new Category();
