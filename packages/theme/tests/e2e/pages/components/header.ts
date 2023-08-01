class Header {
  get cart(): Cypress.Chainable {
    return cy.el('app-header-cart');
  }

  get categories(): Cypress.Chainable {
    return cy.get('[data-e2e*="app-header-url"]');
  }

  get category() {
    return {
      women: () => cy.el('app-header-url_women'),
      men: () => cy.el('app-header-url_men'),
    };
  }

  get account(): Cypress.Chainable {
    return cy.el('app-header-account');
  }

  openCartSidebar(): Cypress.Chainable {
    const click = ($el) => $el.click();
    return click(this.cart).should(() => {
      expect(Cypress.$('[data-e2e="sidebar-cart"]')).to.exist;
    });
  }

  openMyAccount(): Cypress.Chainable {
    const click = ($el) => $el.click();
    return click(this.account);
  }
}

export default new Header();
