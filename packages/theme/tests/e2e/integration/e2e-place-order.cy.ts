import page from '../pages/factory';
import apiDataOrder from '../fixtures/api/e2e-place-order/e2e-order';
import apiDataOrderLoggedIn from '../fixtures/api/e2e-place-order/order-as-logged-in-user';

before(() => {
  cy.fixture('test-data/e2e-place-order').then((fixture) => {
    cy.fixtures = {
      data: fixture,
    };
  });
});

context('Order placement', () => {
  it(['e2e', 'happypath'], 'Should successfully place an order', () => {
    const data = cy.fixtures.data;

    // Add product to cart and go to checkout
    cy.interceptApi('getMinimalProduct', apiDataOrder.getMinimalProduct[0]);
    cy.interceptApi('getCategory', apiDataOrder.getCategory[0]);
    cy.interceptApi('createCart', apiDataOrder.createCart[0]);
    cy.interceptApi('getCart', apiDataOrder.getCart[0]);
    page.home.visit();

    cy.interceptApi(
      'getProductNotFiltered',
      apiDataOrder.getProductNotFiltered[0]
    );
    cy.interceptApi('getMinimalProduct', apiDataOrder.getMinimalProduct[1]);
    cy.interceptApi('getFirstProductId', apiDataOrder.getFirstProductId[0]);
    cy.interceptApi('getProductAttribute', apiDataOrder.getProductAttribute[0]);
    page.home.header.categories.first().click();

    cy.interceptApi('addToCart', apiDataOrder.addToCart[0]);
    page.category.addProductToCart();

    // Go to checkout
    page.category.header.openCartSidebar();

    cy.interceptApi('getCart', apiDataOrder.getCart[1]);
    cy.interceptApi('getFirstProductId', apiDataOrder.getFirstProductId[1]);
    cy.interceptApi('getCountries', apiDataOrder.getCountries[0]);
    page.cartSidebar.goToCheckoutButton.click();

    // Checkout process
    page.checkout.billing.heading.should('be.visible');
    cy.wait(1000);
    page.checkout.billing.fillForm(data.customer);

    cy.interceptApi('getCart', apiDataOrder.getCart[2]).as('getCart2');
    cy.interceptApi('addAddress', apiDataOrder.addAddress[0]);
    cy.interceptApi('getFirstProductId', apiDataOrder.getFirstProductId[2]);
    cy.interceptApi('getCountries', apiDataOrder.getCountries[1]);
    page.checkout.billing.continueToShippingButton.click();
    cy.wait('@getCart2').then(() => {
      cy.interceptApi('getCart', apiDataOrder.getCart[3]);
    });

    page.checkout.shipping.heading.should('be.visible');
    cy.wait(1000);
    page.checkout.shipping.fillForm(data.customer);

    cy.interceptApi('addAddress', apiDataOrder.addAddress[1]);
    cy.interceptApi('getShippingMethods', apiDataOrder.getShippingMethods[0]);
    page.checkout.shipping.selectShippingButton.click();

    cy.interceptApi('updateCartShipping', apiDataOrder.updateCartShipping[0]);
    page.checkout.shipping.shippingMethods.first().click();

    cy.interceptApi('updateCartPayment', apiDataOrder.updateCartPayment[0]);
    cy.interceptApi('getPaymentMethods', apiDataOrder.getPaymentMethods[0]);
    cy.interceptApi('getFirstProductId', apiDataOrder.getFirstProductId[3]);
    cy.interceptApi('getCart', apiDataOrder.getCart[4]).as('getCart4');
    page.checkout.shipping.continueToPaymentButton.click();
    cy.wait('@getCart4').then(() => {
      cy.interceptApi('getCart', apiDataOrder.getCart[5]);
    });

    page.checkout.payment.paymentMethods.first().click();

    cy.interceptApi('createCart', apiDataOrder.createCart[0]).as('createCart0');
    cy.interceptApi('createOrder', apiDataOrder.createOrder[0]);
    cy.interceptApi('getCart', apiDataOrder.getCart[6]).as('getCart6');
    page.checkout.payment.makeAnOrderButton.click();
    cy.wait('@getCart6').then(() => {
      cy.interceptApi('getCart', apiDataOrder.getCart[7]);
    });
    cy.wait('@createCart0').then(() => {
      cy.interceptApi('createCart', apiDataOrder.createCart[1]);
    });

    cy.wait(1000).clearCookies();

    cy.interceptApi('getCart', apiDataOrder.getCart[8]);
    cy.interceptApi('getCategory', apiDataOrder.getCategory[1]);
    cy.interceptApi('createCart', apiDataOrder.createCart[2]);
    cy.visit('/en/checkout/thank-you?order=000000010');

    page.checkout.thankyou.heading.should('be.visible');
  });
  it(
    ['e2e', 'happypath'],
    'Should successfully place an order as logged in user',
    () => {
      const data = cy.fixtures.data;

      cy.interceptApi(
        'getMinimalProduct',
        apiDataOrderLoggedIn.getMinimalProduct[0]
      );
      cy.interceptApi('getCategory', apiDataOrderLoggedIn.getCategory[0]);
      cy.interceptApi('createCart', apiDataOrderLoggedIn.createCart[0]);
      cy.interceptApi('getCart', apiDataOrderLoggedIn.getCart[0]);
      page.home.visit();

      // Login process
      page.home.header.openMyAccount();
      page.loginModal.modal.should('be.visible');

      cy.interceptApi('loginUser', apiDataOrderLoggedIn.loginUser[0]);
      cy.interceptApi('createCart', apiDataOrderLoggedIn.createCart[1]);
      cy.interceptApi('getUser', apiDataOrderLoggedIn.getUser[0]);
      cy.interceptApi('getCart', apiDataOrderLoggedIn.getCart[1]);
      cy.interceptApi(
        'getUserAddresses',
        apiDataOrderLoggedIn.getUserAddresses[0]
      );
      cy.interceptApi('getUserOrders', apiDataOrderLoggedIn.getUserOrders[0]);
      cy.interceptApi(
        'getFirstProductId',
        apiDataOrderLoggedIn.getFirstProductId[0]
      );
      cy.interceptApi('getWishlists', apiDataOrderLoggedIn.getWishlists[0]);
      page.loginModal.login(
        data.userLogin.user.email,
        data.userLogin.user.password
      );

      page.myAccount.myAccountContent.should('be.visible');

      cy.interceptApi(
        'getProductNotFiltered',
        apiDataOrderLoggedIn.getProductNotFiltered[0]
      );
      cy.interceptApi(
        'getMinimalProduct',
        apiDataOrderLoggedIn.getMinimalProduct[1]
      );
      cy.interceptApi(
        'getFirstProductId',
        apiDataOrderLoggedIn.getFirstProductId[1]
      );
      cy.interceptApi(
        'getProductAttribute',
        apiDataOrderLoggedIn.getProductAttribute[0]
      );
      page.home.header.categories.first().click();

      cy.interceptApi('addToCart', apiDataOrderLoggedIn.addToCart[0]);
      page.category.addProductToCart();

      // Go to checkout
      page.category.header.openCartSidebar();

      cy.interceptApi('getCart', apiDataOrderLoggedIn.getCart[2]);
      cy.interceptApi(
        'getFirstProductId',
        apiDataOrderLoggedIn.getFirstProductId[2]
      );
      cy.interceptApi('getCountries', apiDataOrderLoggedIn.getCountries[0]);
      page.cartSidebar.goToCheckoutButton.click();

      // Checkout process
      page.checkout.billing.heading.should('be.visible');
      cy.wait(1000);
      page.checkout.billing.fillForm(data.customer, true);

      cy.interceptApi('getCart', apiDataOrderLoggedIn.getCart[3]).as(
        'getCart3'
      );
      cy.interceptApi('addAddress', apiDataOrderLoggedIn.addAddress[0]);
      cy.interceptApi(
        'getFirstProductId',
        apiDataOrderLoggedIn.getFirstProductId[3]
      );
      cy.interceptApi('getCountries', apiDataOrderLoggedIn.getCountries[1]);
      page.checkout.billing.continueToShippingButton.click();
      cy.wait('@getCart3').then(() => {
        cy.interceptApi('getCart', apiDataOrderLoggedIn.getCart[4]);
      });

      page.checkout.shipping.heading.should('be.visible');
      cy.wait(1000);
      page.checkout.shipping.fillForm(data.customer);

      cy.interceptApi('addAddress', apiDataOrderLoggedIn.addAddress[1]);
      cy.interceptApi(
        'getShippingMethods',
        apiDataOrderLoggedIn.getShippingMethods[0]
      );
      page.checkout.shipping.selectShippingButton.click();

      cy.interceptApi(
        'updateCartShipping',
        apiDataOrderLoggedIn.updateCartShipping[0]
      );
      page.checkout.shipping.shippingMethods.first().click();

      cy.interceptApi(
        'updateCartPayment',
        apiDataOrderLoggedIn.updateCartPayment[0]
      );
      cy.interceptApi(
        'getPaymentMethods',
        apiDataOrderLoggedIn.getPaymentMethods[0]
      );
      cy.interceptApi(
        'getFirstProductId',
        apiDataOrderLoggedIn.getFirstProductId[4]
      );
      cy.interceptApi('getCart', apiDataOrderLoggedIn.getCart[5]).as(
        'getCart5'
      );
      page.checkout.shipping.continueToPaymentButton.click();
      cy.wait('@getCart5').then(() => {
        cy.interceptApi('getCart', apiDataOrderLoggedIn.getCart[6]);
      });

      page.checkout.payment.paymentMethods.first().click();

      cy.interceptApi('createCart', apiDataOrderLoggedIn.createCart[2]).as(
        'createCart0'
      );
      cy.interceptApi('createOrder', apiDataOrderLoggedIn.createOrder[0]);
      cy.interceptApi('getCart', apiDataOrderLoggedIn.getCart[7]).as(
        'getCart7'
      );
      page.checkout.payment.makeAnOrderButton.click();
      cy.wait('@getCart7').then(() => {
        cy.interceptApi('getCart', apiDataOrderLoggedIn.getCart[8]);
      });
      cy.wait('@createCart0').then(() => {
        cy.interceptApi('createCart', apiDataOrderLoggedIn.createCart[3]);
      });

      cy.wait(1000).clearCookies();

      cy.interceptApi('getCart', apiDataOrderLoggedIn.getCart[9]);
      cy.interceptApi('getCategory', apiDataOrderLoggedIn.getCategory[1]);
      cy.interceptApi('createCart', apiDataOrderLoggedIn.createCart[4]);
      cy.visit('/en/checkout/thank-you?order=000000010');

      page.checkout.thankyou.heading.should('be.visible');
    }
  );
});
