import Base from './base';

class Home extends Base {
  visit(): Cypress.Chainable {
    return cy.visit('/').clearCookies();
  }
}

export default new Home();
