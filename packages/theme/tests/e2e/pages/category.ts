import Base from './base';
import product from './product';
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
    productModal.addToCartButton.first().should('be.visible');

    // Change quantity
    if (typeQuantity) {
      product.quantitySelector.quantityInput
        .type(`{selectall}${quantity}`)
        .wait(200);
      product.quantitySelector.confirmQuantityButton.click().wait(200);
    } else {
      product.quantitySelector.increaseQuantity(quantity - 1);
    }
    productModal.quantitySelector.quantityInput.should(
      'have.value',
      `${quantity}`
    );

    // Select variant
    if (selectVariants) {
      for (const variant of selectVariants) {
        productModal.variantsSelector.selectVariant(
          variant.selectorId,
          variant.variant,
          variant.expectedValue
        );
      }
    }

    // Add to cart
    productModal.addToCartButton.first().click();
  }
}

export default new Category();
