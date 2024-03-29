class LoginModal {
  get modal(): Cypress.Chainable {
    return cy.el('login-modal', '> .sf-modal__container');
  }

  get emailInput(): Cypress.Chainable {
    return cy.el('login-modal-email');
  }

  get passwordInput(): Cypress.Chainable {
    return cy.el('login-modal-password');
  }

  get rememberMeCheckbox(): Cypress.Chainable {
    return cy.el('login-modal-remember-me', '> label');
  }

  get submitButton(): Cypress.Chainable {
    return cy.el('login-modal-submit');
  }

  get forgotPasswordButton(): Cypress.Chainable {
    return cy.el('login-modal-forgot-password');
  }

  get registerButton(): Cypress.Chainable {
    return cy.el('login-modal-register');
  }

  get errorMessage(): Cypress.Chainable {
    return cy.el('login-modal-error');
  }

  public login(
    email: string,
    password: string,
    rememberMe?: boolean
  ): Cypress.Chainable {
    this.emailInput.type(email);
    this.passwordInput.type(password);
    if (rememberMe) {
      this.rememberMeCheckbox.click();
    }
    this.submitButton.should('not.have.class', 'is-disabled--button').click();
    return cy;
  }
}

export default new LoginModal();
