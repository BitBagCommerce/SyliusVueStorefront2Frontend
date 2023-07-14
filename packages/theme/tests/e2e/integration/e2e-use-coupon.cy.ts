import page from '../pages/factory';
import * as apiResponses from '../fixtures/api/e2e-api-responses';
import { getCartModifications } from '../fixtures/api/e2e-api-responses-modifications';

before(() => {
  cy.fixture('test-data/e2e-place-order').then((fixture) => {
    cy.fixtures = {
      data: fixture,
    };
  });
});

context('Order placement with coupon code', () => {
  it(
    ['e2e', 'happypath'],
    'Should successfully place an order with coupon code',
    () => {
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
      cy.interceptApi(
        'addCouponToCart',
        apiResponses.addCouponToCart.correctCoupon
      );

      // Add product to cart and go to checkout
      page.home.visit();
      page.home.header.categories.first().click();

      cy.wait(10).then(() => {
        currentCart = getCartModifications.addProduct(currentCart);
        currentCart = getCartModifications.setQuantity(currentCart, 220, 8);
        cy.interceptApi('getCart', currentCart);
      });

      page.category.addProductToCart(0, 7);
      page.product.header.openCart();
      page.cart.goToCheckoutButton.click();

      // Checkout process
      page.checkout.billing.heading.should('be.visible');

      cy.wait(1000);

      cy.wait(10).then(() => {
        currentCart = getCartModifications.setCouponCode(
          currentCart,
          apiResponses.addCouponToCart.correctCoupon.promotionCoupon
        );
        cy.interceptApi('getCart', currentCart);
      });

      // Apply coupon code
      page.checkout.coupons.applyCouponCode(data.couponCode.code);
      page.checkout.coupons.appliedCouponCode.should('be.visible');
      cy.wait(1000);

      page.checkout.billing.fillForm(data.customer);

      cy.wait(10).then(() => {
        currentCart = getCartModifications.setBillingAddress(
          currentCart,
          apiResponses.addAddress.billing.billingAddress
        );
        cy.interceptApi('getCart', currentCart);
      });

      page.checkout.billing.continueToShippingButton.click();
      page.checkout.shipping.heading.should('be.visible');
      cy.wait(1000);
      page.checkout.shipping.fillForm(data.customer);
      page.checkout.shipping.selectShippingButton.click();
      page.checkout.shipping.shippingMethods.first().click();

      cy.wait(10).then(() => {
        currentCart = getCartModifications.setShippingAddress(
          currentCart,
          apiResponses.addAddress.shpipping.shippingAddress
        );
        cy.interceptApi('getCart', currentCart);
      });

      page.checkout.shipping.continueToPaymentButton.click();
      page.checkout.payment.paymentMethods.first().click();
      page.checkout.payment.makeAnOrderButton.click();
      cy.wait(1000).clearCookies();
      cy.visit('http://localhost:3000/en/checkout/thank-you?order=000000010');

      cy.wait(10).then(() => {
        currentCart = apiResponses.getCart.empty;
        cy.interceptApi('getCart', currentCart);
      });

      page.checkout.thankyou.heading.should('be.visible');
    }
  );
});
