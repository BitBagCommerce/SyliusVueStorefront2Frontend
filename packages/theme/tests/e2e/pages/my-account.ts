import Base from './base';

class MyAccount extends Base {
  get path() {
    return '/my-account';
  }

  get myAccountContent(): Cypress.Chainable {
    return cy.el('my-account-content-pages');
  }
}

export default new MyAccount();
