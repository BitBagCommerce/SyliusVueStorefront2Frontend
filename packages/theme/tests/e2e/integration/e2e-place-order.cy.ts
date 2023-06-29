import page from '../pages/factory';

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
    page.home.visit();
    page.home.header.categories.first().click();
    page.category.addProductToCart();
    page.product.header.openCart();
    page.cart.goToCheckoutButton.click();

    // Checkout process
    page.checkout.billing.heading.should('be.visible');
    cy.wait(1000);
    page.checkout.billing.fillForm(data.customer);
    page.checkout.billing.continueToShippingButton.click();
    page.checkout.shipping.heading.should('be.visible');
    cy.wait(1000);
    page.checkout.shipping.fillForm(data.customer);
    page.checkout.shipping.selectShippingButton.click();
    page.checkout.shipping.shippingMethods.first().click();
    page.checkout.shipping.continueToPaymentButton.click();
    page.checkout.payment.paymentMethods.first().click();
    page.checkout.payment.makeAnOrderButton.click();
    page.checkout.thankyou.heading.should('be.visible');
  });
});
