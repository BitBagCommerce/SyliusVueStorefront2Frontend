class VariantsSelector {
  get getVariantSelector(): Cypress.Chainable {
    return cy.el('variant-selector', '> select');
  }

  get getVariantSelectorOptions(): Cypress.Chainable {
    return cy.el('variant-selector', '> select > option');
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

export default new VariantsSelector();
