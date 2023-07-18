import product from './product';
import productModal from './components/product-modal';

class Category {
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
      product.quantityInput.type(`{selectall}${quantity}`).wait(200);
      product.confirmQuantityButton.click().wait(200);
    } else {
      product.increaseQuantity(quantity - 1);
    }
    productModal.quantityInput.should('have.value', `${quantity}`);

    // Select variant
    if (selectVariants) {
      for (const variant of selectVariants) {
        productModal.selectVariant(
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
