import page from '../pages/factory';
import apiData from '../fixtures/api/e2e-place-order';

before(() => {
  cy.fixture('test-data/e2e-place-order').then((fixture) => {
    cy.fixtures = {
      data: fixture,
    };
  });
});

context('Order placement', () => {
  // it(['e2e', 'happypath'], 'Should successfully place an order', () => {
  //   const data = cy.fixtures.data;

  //   // Add product to cart and go to checkout
  //   cy.interceptApi('getMinimalProduct', apiData.getMinimalProduct[0]);
  //   cy.interceptApi('getCategory', apiData.getCategory[0]);
  //   cy.interceptApi('createCart', apiData.createCart[0]);
  //   cy.interceptApi('getCart', apiData.getCart[0]);
  //   page.home.visit();

  //   cy.interceptApi('getProductNotFiltered', apiData.getProductNotFiltered[0]);
  //   cy.interceptApi('getMinimalProduct', apiData.getMinimalProduct[1]);
  //   cy.interceptApi('getFirstProductId', apiData.getFirstProductId[0]);
  //   cy.interceptApi('getProductAttribute', apiData.getProductAttribute[0]);
  //   page.home.header.categories.first().click();

  //   cy.interceptApi('addToCart', apiData.addToCart[0]);
  //   page.category.addProductToCart();

  //   // Go to checkout
  //   page.category.header.openCartSidebar();

  //   cy.interceptApi('getCart', apiData.getCart[1]);
  //   cy.interceptApi('getFirstProductId', apiData.getFirstProductId[1]);
  //   cy.interceptApi('getCountries', apiData.getCountries[0]);
  //   page.cartSidebar.goToCheckoutButton.click();

  //   // Checkout process
  //   page.checkout.billing.heading.should('be.visible');
  //   cy.wait(1000);
  //   page.checkout.billing.fillForm(data.customer);

  //   cy.interceptApi('getCart', apiData.getCart[2]).as('getCart2');
  //   cy.interceptApi('addAddress', apiData.addAddress[0]);
  //   cy.interceptApi('getFirstProductId', apiData.getFirstProductId[2]);
  //   cy.interceptApi('getCountries', apiData.getCountries[1]);
  //   page.checkout.billing.continueToShippingButton.click();
  //   cy.wait('@getCart2').then(() => {
  //     cy.interceptApi('getCart', apiData.getCart[3]);
  //   });

  //   page.checkout.shipping.heading.should('be.visible');
  //   cy.wait(1000);
  //   page.checkout.shipping.fillForm(data.customer);

  //   cy.interceptApi('addAddress', apiData.addAddress[1]);
  //   cy.interceptApi('getShippingMethods', apiData.getShippingMethods[0]);
  //   page.checkout.shipping.selectShippingButton.click();

  //   cy.interceptApi('updateCartShipping', apiData.updateCartShipping[0]);
  //   page.checkout.shipping.shippingMethods.first().click();

  //   cy.interceptApi('updateCartPayment', apiData.updateCartPayment[0]);
  //   cy.interceptApi('getPaymentMethods', apiData.getPaymentMethods[0]);
  //   cy.interceptApi('getFirstProductId', apiData.getFirstProductId[3]);
  //   cy.interceptApi('getCart', apiData.getCart[4]).as('getCart4');
  //   page.checkout.shipping.continueToPaymentButton.click();
  //   cy.wait('@getCart4').then(() => {
  //     cy.interceptApi('getCart', apiData.getCart[5]);
  //   });

  //   page.checkout.payment.paymentMethods.first().click();

  //   cy.interceptApi('createCart', apiData.createCart[0]).as('createCart0');
  //   cy.interceptApi('createOrder', apiData.createOrder[0]);
  //   cy.interceptApi('getCart', apiData.getCart[6]).as('getCart6');
  //   page.checkout.payment.makeAnOrderButton.click();
  //   cy.wait('@getCart6').then(() => {
  //     cy.interceptApi('getCart', apiData.getCart[7]);
  //   });
  //   cy.wait('@createCart0').then(() => {
  //     cy.interceptApi('createCart', apiData.createCart[1]);
  //   });

  //   cy.wait(1000).clearCookies();

  //   cy.interceptApi('getCart', apiData.getCart[8]);
  //   cy.interceptApi('getCategory', apiData.getCategory[1]);
  //   cy.interceptApi('createCart', apiData.createCart[2]);
  //   cy.visit('/en/checkout/thank-you?order=000000010');

  //   page.checkout.thankyou.heading.should('be.visible');
  // });
  it(
    ['e2e', 'happypath'],
    'Should successfully place an order as logged in user',
    () => {
      const data = cy.fixtures.data;
      // let apiDataGen = {};
      // cy.dataAutogenIntercept(apiDataGen).then((newData) => {
      //   apiDataGen = newData;
      // });

      // Add product to cart and go to checkout
      // cy.interceptApi('getMinimalProduct', apiData.getMinimalProduct[0]);
      // cy.interceptApi('getCategory', apiData.getCategory[0]);
      // cy.interceptApi('createCart', apiData.createCart[0]);
      // cy.interceptApi('getCart', apiData.getCart[0]);
      page.home.visit();

      // Login process
      page.home.header.openMyAccount();
      page.loginModal.modal.should('be.visible');

      page.loginModal.login(
        data.userLogin.user.email,
        data.userLogin.user.password
      );

      cy.wait(5000);

      // cy.interceptApi('getProductNotFiltered', apiData.getProductNotFiltered[0]);
      // cy.interceptApi('getMinimalProduct', apiData.getMinimalProduct[1]);
      // cy.interceptApi('getFirstProductId', apiData.getFirstProductId[0]);
      // cy.interceptApi('getProductAttribute', apiData.getProductAttribute[0]);
      page.home.header.categories.first().click();

      // cy.interceptApi('addToCart', apiData.addToCart[0]);
      page.category.addProductToCart();

      // Go to checkout
      page.category.header.openCartSidebar();

      // cy.interceptApi('getCart', apiData.getCart[1]);
      // cy.interceptApi('getFirstProductId', apiData.getFirstProductId[1]);
      // cy.interceptApi('getCountries', apiData.getCountries[0]);
      page.cartSidebar.goToCheckoutButton.click();

      // Checkout process
      page.checkout.billing.heading.should('be.visible');
      cy.wait(1000);
      page.checkout.billing.fillForm(data.customer, true);

      // cy.interceptApi('getCart', apiData.getCart[2]).as('getCart2');
      // cy.interceptApi('addAddress', apiData.addAddress[0]);
      // cy.interceptApi('getFirstProductId', apiData.getFirstProductId[2]);
      // cy.interceptApi('getCountries', apiData.getCountries[1]);
      page.checkout.billing.continueToShippingButton.click();
      // cy.wait('@getCart2').then(() => {
      //   cy.interceptApi('getCart', apiData.getCart[3]);
      // });

      page.checkout.shipping.heading.should('be.visible');
      cy.wait(1000);
      page.checkout.shipping.fillForm(data.customer);

      // cy.interceptApi('addAddress', apiData.addAddress[1]);
      // cy.interceptApi('getShippingMethods', apiData.getShippingMethods[0]);
      page.checkout.shipping.selectShippingButton.click();

      // cy.interceptApi('updateCartShipping', apiData.updateCartShipping[0]);
      page.checkout.shipping.shippingMethods.first().click();

      // cy.interceptApi('updateCartPayment', apiData.updateCartPayment[0]);
      // cy.interceptApi('getPaymentMethods', apiData.getPaymentMethods[0]);
      // cy.interceptApi('getFirstProductId', apiData.getFirstProductId[3]);
      // cy.interceptApi('getCart', apiData.getCart[4]).as('getCart4');
      page.checkout.shipping.continueToPaymentButton.click();
      // cy.wait('@getCart4').then(() => {
      // cy.interceptApi('getCart', apiData.getCart[5]);
      // });

      page.checkout.payment.paymentMethods.first().click();

      // cy.interceptApi('createCart', apiData.createCart[0]).as('createCart0');
      // cy.interceptApi('createOrder', apiData.createOrder[0]);
      // cy.interceptApi('getCart', apiData.getCart[6]).as('getCart6');
      page.checkout.payment.makeAnOrderButton.click();
      // cy.wait('@getCart6').then(() => {
      // cy.interceptApi('getCart', apiData.getCart[7]);
      // });
      // cy.wait('@createCart0').then(() => {
      // cy.interceptApi('createCart', apiData.createCart[1]);
      // });

      cy.wait(1000).clearCookies();

      // cy.interceptApi('getCart', apiData.getCart[8]);
      // cy.interceptApi('getCategory', apiData.getCategory[1]);
      // cy.interceptApi('createCart', apiData.createCart[2]);
      cy.visit('/en/checkout/thank-you?order=000000010');

      page.checkout.thankyou.heading.should('be.visible');
      // cy.dataAutogenSaveToFile(
      //   apiDataGen,
      //   'e2e-place-order/order-as-logged-in-user'
      // );
    }
  );
});
