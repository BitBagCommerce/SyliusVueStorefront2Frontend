import page from '../pages/factory';
import * as apiResponses from '../fixtures/test-data/e2e-api-responses';
import * as apiModifications from '../fixtures/test-data/e2e-api-responses-modifications';

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
    let currentCart = apiResponses.getCart.empty;

    // Mocking API responses
    cy.interceptApi(
      'getMinimalProduct',
      apiResponses.getMinimalProduct.minimalProducts
    );
    cy.interceptApi('getCategory', apiResponses.getCategory.categories);
    cy.interceptApi('createCart', apiResponses.createCart.cart);
    cy.interceptApi('getCart', currentCart);
    cy.interceptApi(
      'getFirstProductId',
      apiResponses.getFirstProductId.firstProductId
    );
    cy.interceptApi(
      'getProductAttribute',
      apiResponses.getProductAttribute.productAttributes
    );
    cy.interceptApi('getCountries', apiResponses.getCountries.countries);
    cy.interceptApi('addToCart', apiResponses.addToCart.singleProduct);
    cy.interceptApi('addAddress', apiResponses.addAddress.billing);
    cy.interceptApi(
      'getProductNotFiltered',
      apiResponses.getProductNotFiltered.productsNotFiltered
    );
    cy.interceptApi(
      'getShippingMethods',
      apiResponses.getShippingMethods.shippingMethods
    );
    cy.interceptApi(
      'getPaymentMethods',
      apiResponses.getPaymentMethods.paymentMethods
    );
    cy.interceptApi(
      'updateCartShipping',
      apiResponses.updateCartShipping.cartShipping
    );
    cy.interceptApi(
      'updateCartPayment',
      apiResponses.updateCartPayment.cartPayment
    );
    cy.interceptApi('createOrder', apiResponses.createOrder.order);

    // Add product to cart and go to checkout
    page.home.visit();
    page.home.header.categories.first().click();

    cy.wait(3000);

    currentCart = apiModifications.getCartModifications.addProduct(currentCart);
    cy.interceptApi('getCart', currentCart);
    // cy.interceptApi('getCart', apiResponses.getCart.withProduct);

    page.category.addProductToCart();
    page.product.header.openCart();
    page.cart.goToCheckoutButton.click();

    // Checkout process
    page.checkout.billing.heading.should('be.visible');
    cy.wait(1000);
    page.checkout.billing.fillForm(data.customer);

    currentCart = apiModifications.getCartModifications.setBillingAddress(
      currentCart,
      apiResponses.addAddress.billing.billingAddress
    );
    cy.interceptApi('getCart', currentCart);
    // cy.interceptApi('getCart', apiResponses.getCart.billingSumbitted);

    page.checkout.billing.continueToShippingButton.click();
    page.checkout.shipping.heading.should('be.visible');
    cy.wait(1000);
    page.checkout.shipping.fillForm(data.customer);
    page.checkout.shipping.selectShippingButton.click();
    page.checkout.shipping.shippingMethods.first().click();

    currentCart = apiModifications.getCartModifications.setShippingAddress(
      currentCart,
      apiResponses.addAddress.shpipping.shippingAddress
    );
    cy.interceptApi('getCart', currentCart);
    // cy.interceptApi('getCart', apiResponses.getCart.shippingSumbitted);

    page.checkout.shipping.continueToPaymentButton.click();
    page.checkout.payment.paymentMethods.first().click();
    page.checkout.payment.makeAnOrderButton.click();
    cy.wait(1000).clearCookies();
    cy.visit('http://localhost:3000/en/checkout/thank-you?order=000000010');
    page.checkout.thankyou.heading.should('be.visible');

    currentCart = apiResponses.getCart.empty;
    cy.interceptApi('getCart', currentCart);
  });

  it(
    ['e2e', 'happypath'],
    'Should successfully place an order with coupon code',
    () => {
      const data = cy.fixtures.data;

      // Mocking API responses
      cy.interceptApi(
        'getMinimalProduct',
        apiResponses.getMinimalProduct.minimalProducts
      );
      cy.interceptApi('getCategory', apiResponses.getCategory.categories);
      cy.interceptApi('createCart', apiResponses.createCart.cart);
      cy.interceptApi('getCart', apiResponses.getCart.empty);
      cy.interceptApi(
        'getFirstProductId',
        apiResponses.getFirstProductId.firstProductId
      );
      cy.interceptApi(
        'getProductAttribute',
        apiResponses.getProductAttribute.productAttributes
      );
      cy.interceptApi('getCountries', apiResponses.getCountries.countries);
      cy.interceptApi(
        'addToCart',
        apiResponses.addToCart.singleProductAnd8Quantity
      );
      cy.interceptApi('addAddress', apiResponses.addAddress.billing);
      cy.interceptApi(
        'getProductNotFiltered',
        apiResponses.getProductNotFiltered.productsNotFiltered
      );
      cy.interceptApi(
        'getShippingMethods',
        apiResponses.getShippingMethods.shippingMethods
      );
      cy.interceptApi(
        'getPaymentMethods',
        apiResponses.getPaymentMethods.paymentMethods
      );
      cy.interceptApi(
        'updateCartShipping',
        apiResponses.updateCartShipping.cartShipping
      );
      cy.interceptApi(
        'updateCartPayment',
        apiResponses.updateCartPayment.cartPayment
      );
      cy.interceptApi('createOrder', apiResponses.createOrder.order);
      cy.interceptApi(
        'addCouponToCart',
        apiResponses.addCouponToCart.correctCoupon
      );

      // cy.intercept('POST', '/api/sylius/getMinimalProduct', (req) => {});
      // cy.intercept('POST', '/api/sylius/getCategory', (req) => {});
      // cy.intercept('POST', '/api/sylius/createCart', (req) => {});
      // cy.intercept('POST', '/api/sylius/getCart', (req) => {});
      // cy.intercept('POST', '/api/sylius/getFirstProductId', (req) => {});
      // cy.intercept('POST', '/api/sylius/getProductAttribute', (req) => {});
      // cy.intercept('POST', '/api/sylius/getCountries', (req) => {});
      // cy.intercept('POST', '/api/sylius/addToCart', (req) => {});
      // cy.intercept('POST', '/api/sylius/addAddress', (req) => {});
      // cy.intercept('POST', '/api/sylius/getProductNotFiltered', (req) => {});
      // cy.intercept('POST', '/api/sylius/getShippingMethods', (req) => {});
      // cy.intercept('POST', '/api/sylius/getPaymentMethods', (req) => {});
      // cy.intercept('POST', '/api/sylius/updateCartShipping', (req) => {});
      // cy.intercept('POST', '/api/sylius/updateCartPayment', (req) => {});
      // cy.intercept('POST', '/api/sylius/createOrder', (req) => {});
      // cy.intercept('POST', '/api/sylius/addCouponToCart', (req) => {});
      // cy.intercept('POST', '/api/sylius/updateCartShipping', (req) => {});

      let currentCart = apiResponses.getCart.empty;

      // Add product to cart and go to checkout
      page.home.visit();
      page.home.header.categories.first().click();

      currentCart =
        apiModifications.getCartModifications.addProduct(currentCart);
      currentCart = apiModifications.getCartModifications.setQuantity(
        currentCart,
        220,
        8
      );
      cy.interceptApi('getCart', currentCart);
      // cy.interceptApi('getCart', apiResponses.getCart.withPorductAnd8Quantity);

      page.category.addProductToCart(0, 7);
      page.product.header.openCart();
      page.cart.goToCheckoutButton.click();

      // Checkout process
      page.checkout.billing.heading.should('be.visible');
      cy.wait(1000);

      // Apply coupon code
      page.checkout.coupons.applyCouponCode(data.couponCode.code);
      page.checkout.coupons.appliedCouponCode.should('be.visible');
      cy.wait(1000);

      // Continue checkout process
      page.checkout.billing.fillForm(data.customer);

      currentCart = apiModifications.getCartModifications.setBillingAddress(
        currentCart,
        apiResponses.addAddress.billing.billingAddress
      );
      cy.interceptApi('getCart', currentCart);
      // cy.interceptApi('getCart', apiResponses.getCart.billingSumbitted);

      page.checkout.billing.continueToShippingButton.click();
      page.checkout.shipping.heading.should('be.visible');
      cy.wait(1000);
      page.checkout.shipping.fillForm(data.customer);
      page.checkout.shipping.selectShippingButton.click();
      page.checkout.shipping.shippingMethods.first().click();

      currentCart = apiModifications.getCartModifications.setShippingAddress(
        currentCart,
        apiResponses.addAddress.shpipping.shippingAddress
      );
      cy.interceptApi('getCart', currentCart);
      // cy.interceptApi('getCart', apiResponses.getCart.shippingSumbitted);

      page.checkout.shipping.continueToPaymentButton.click();
      page.checkout.payment.paymentMethods.first().click();
      page.checkout.payment.makeAnOrderButton.click();
      cy.wait(1000).clearCookies();
      cy.visit('http://localhost:3000/en/checkout/thank-you?order=000000010');
      page.checkout.thankyou.heading.should('be.visible');

      currentCart = apiResponses.getCart.empty;
      cy.interceptApi('getCart', currentCart);
    }
  );
});
