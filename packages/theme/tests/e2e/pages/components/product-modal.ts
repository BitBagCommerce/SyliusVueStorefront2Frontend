class ProductModal {
  get decreseQuantityButton(): Cypress.Chainable {
    return cy.el('minus-quantity-button');
  }

  get increaseQuantityButton(): Cypress.Chainable {
    return cy.el('plus-quantity-button');
  }

  get confirmQuantityButton(): Cypress.Chainable {
    return cy.el('confirm-quantity-button');
  }

  get quantityInput(): Cypress.Chainable {
    return cy.el('quantity-input');
  }

  public decreaseQuantity(by = 1) {
    for (let i = 0; i < by; i++) {
      this.decreseQuantityButton.first().click();
    }
  }

  public increaseQuantity(by = 1) {
    for (let i = 0; i < by; i++) {
      this.increaseQuantityButton.first().click();
    }
  }

  get addToCartButton(): Cypress.Chainable {
    return cy.el('modal__add-to-cart');
  }

  get getVariantSelector(): Cypress.Chainable {
    return cy.el('modal-variant-selector', '> select');
  }

  get getVariantSelectorOptions(): Cypress.Chainable {
    return cy.el('modal-variant-selector', '> select > option');
  }

  public selectVariant(
    selectorId: number,
    variant: number | string,
    expectedValue?: string
  ) {
    this.getVariantSelector.eq(selectorId).select(variant);
    if (expectedValue) {
      this.getVariantSelector
        .eq(selectorId)
        .should('have.value', expectedValue);
    }
  }
}

export default new ProductModal();
