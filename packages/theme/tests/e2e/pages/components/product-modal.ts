import quantitySelector from './quantity-selector';
import variantsSelector from './variants-selector';

class ProductModal {
  get addToCartButton(): Cypress.Chainable {
    return cy.el('modal__add-to-cart', '> button');
  }

  get quantitySelector() {
    return quantitySelector;
  }

  get variantsSelector() {
    return variantsSelector;
  }

  public addProductToCart(
    quantity = 1,
    typeQuantity = false,
    selectVariants?: {
      selectorId: number;
      variant: number | string;
      expectedValue?: string;
    }[]
  ) {
    // Check if modal is open
    this.addToCartButton.first().should('be.visible');

    // Change quantity
    if (typeQuantity) {
      this.quantitySelector.quantityInput
        .type(`{selectall}${quantity}`)
        .wait(200);
      this.quantitySelector.confirmQuantityButton.click().wait(200);
    } else {
      this.quantitySelector.increaseQuantity(quantity - 1);
    }
    this.quantitySelector.quantityInput.should('have.value', `${quantity}`);

    // Select variant
    if (selectVariants) {
      for (const variant of selectVariants) {
        this.variantsSelector.selectVariant(
          variant.selectorId,
          variant.variant,
          variant.expectedValue
        );
      }
    }

    // Add to cart
    cy.wait(500);
    this.addToCartButton.first().should('be.visible');
    this.addToCartButton
      .first()
      .should('not.have.class', 'is-disabled--button')
      .then(() => {
        this.addToCartButton.first().click();
      });
    cy.wait(1000);
  }
}

export default new ProductModal();
