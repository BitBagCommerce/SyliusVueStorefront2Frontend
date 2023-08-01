import page from '../pages/factory';
import apiDataLogin from '../fixtures/api/e2e-user-login/e2e-login';
import apiDataLoginRememberMe from '../fixtures/api/e2e-user-login/e2e-login-remember-me';
import apiDataFailNonExistingUser from '../fixtures/api/e2e-user-login/e2e-login-fail-non-existing-user';
import apiDataFailWrongPassword from '../fixtures/api/e2e-user-login/e2e-login-fail-wrong-password';

before(() => {
  cy.fixture('test-data/e2e-user-login').then((fixture) => {
    cy.fixtures = {
      data: fixture,
    };
  });
});

context('User login', () => {
  it(
    ['e2e', 'happypath'],
    'Should successfully log in user and redirect to my account page',
    () => {
      const data = cy.fixtures.data;
      // Visit homepage
      cy.interceptApi('getMinimalProduct', apiDataLogin.getMinimalProduct[0]);
      cy.interceptApi('getCategory', apiDataLogin.getCategory[0]);
      cy.interceptApi('createCart', apiDataLogin.createCart[0]);
      cy.interceptApi('getCart', apiDataLogin.getCart[0]);
      page.home.visit();

      // Login process
      page.home.header.openMyAccount();
      page.loginModal.modal.should('be.visible');

      cy.interceptApi('loginUser', apiDataLogin.loginUser[0]);
      cy.interceptApi('createCart', apiDataLogin.createCart[1]);
      cy.interceptApi('getUser', apiDataLogin.getUser[0]);
      cy.interceptApi('getCart', apiDataLogin.getCart[1]);
      cy.interceptApi('getUserAddresses', apiDataLogin.getUserAddresses[0]);
      cy.interceptApi('getUserOrders', apiDataLogin.getUserOrders[0]);
      cy.interceptApi('getFirstProductId', apiDataLogin.getFirstProductId[0]);
      page.loginModal.login(data.user.email, data.user.password);

      page.myAccount.myAccountContent.should('be.visible');
    }
  );
  it(
    ['e2e', 'happypath'],
    'Should successfully log in user and redirect to my account page with remember me checked',
    () => {
      const data = cy.fixtures.data;
      // Visit homepage
      cy.interceptApi(
        'getMinimalProduct',
        apiDataLoginRememberMe.getMinimalProduct[0]
      );
      cy.interceptApi('getCategory', apiDataLoginRememberMe.getCategory[0]);
      cy.interceptApi('createCart', apiDataLoginRememberMe.createCart[0]);
      cy.interceptApi('getCart', apiDataLoginRememberMe.getCart[0]);
      page.home.visit();

      // Login process
      page.home.header.openMyAccount();
      page.loginModal.modal.should('be.visible');

      cy.interceptApi('loginUser', apiDataLoginRememberMe.loginUser[0]);
      cy.interceptApi('createCart', apiDataLoginRememberMe.createCart[1]);
      cy.interceptApi('getUser', apiDataLoginRememberMe.getUser[0]);
      cy.interceptApi('getCart', apiDataLoginRememberMe.getCart[1]);
      cy.interceptApi(
        'getUserAddresses',
        apiDataLoginRememberMe.getUserAddresses[0]
      );
      cy.interceptApi('getUserOrders', apiDataLoginRememberMe.getUserOrders[0]);
      cy.interceptApi(
        'getFirstProductId',
        apiDataLoginRememberMe.getFirstProductId[0]
      );
      page.loginModal.login(data.user.email, data.user.password, true);

      page.myAccount.myAccountContent.should('be.visible');
    }
  );

  it(
    ['e2e', 'happypath'],
    'Should fail, trying to log in as non existing user and show error message',
    () => {
      const data = cy.fixtures.data;
      // Visit homepage
      cy.interceptApi(
        'getMinimalProduct',
        apiDataFailNonExistingUser.getMinimalProduct[0]
      );
      cy.interceptApi('getCategory', apiDataFailNonExistingUser.getCategory[0]);
      cy.interceptApi('createCart', apiDataFailNonExistingUser.createCart[0]);
      cy.interceptApi('getCart', apiDataFailNonExistingUser.getCart[0]);
      page.home.visit();

      // Login process
      page.home.header.openMyAccount();
      page.loginModal.modal.should('be.visible');

      cy.interceptApi('loginUser', apiDataFailNonExistingUser.loginUser[0]);
      cy.interceptApi('createCart', apiDataFailNonExistingUser.createCart[1]);
      cy.interceptApi('getCart', apiDataFailNonExistingUser.getCart[1]);
      page.loginModal.login(
        data.nonExistingUser.email,
        data.nonExistingUser.password
      );

      page.loginModal.errorMessage.should('be.visible');
    }
  );

  it(
    ['e2e', 'happypath'],
    'Should fail, trying to log in user with wrong password and show error message',
    () => {
      const data = cy.fixtures.data;
      // Visit homepage
      cy.interceptApi(
        'getMinimalProduct',
        apiDataFailWrongPassword.getMinimalProduct[0]
      );
      cy.interceptApi('getCategory', apiDataFailWrongPassword.getCategory[0]);
      cy.interceptApi('createCart', apiDataFailWrongPassword.createCart[0]);
      cy.interceptApi('getCart', apiDataFailWrongPassword.getCart[0]);
      page.home.visit();

      // Login process
      page.home.header.openMyAccount();
      page.loginModal.modal.should('be.visible');

      cy.interceptApi('loginUser', apiDataFailWrongPassword.loginUser[0]);
      cy.interceptApi('createCart', apiDataFailWrongPassword.createCart[1]);
      cy.interceptApi('getCart', apiDataFailWrongPassword.getCart[1]);
      page.loginModal.login(data.user.email, data.nonExistingUser.password);

      page.loginModal.errorMessage.should('be.visible');
    }
  );
});
