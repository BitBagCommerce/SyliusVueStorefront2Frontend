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

    // Mocking API responses
    cy.interceptGql('getMinimalProduct', 'e2e-getMinimalProduct.json');
    cy.interceptGql('getCategory', 'e2e-getCategory.json');
    cy.interceptGql('createCart', 'e2e-createCart.json');
    cy.interceptGql('getCart', 'e2e-getCart-empty.json');
    cy.interceptGql('getFirstProductId', 'e2e-getFirstProductId.json');
    cy.interceptGql('getProductAttribute', 'e2e-getProductAttribute.json');
    cy.interceptGql('getCountries', 'e2e-getCountries.json');
    cy.interceptGql('addToCart', 'e2e-addToCart.json');
    cy.interceptGql('addAddress', 'e2e-addAddress-billing.json');
    cy.interceptGql('getProductNotFiltered', 'e2e-getProductNotFiltered.json');
    cy.interceptGql('getShippingMethods', 'e2e-getShippingMethods.json');
    cy.interceptGql('getPaymentMethods', 'e2e-getPaymentMethods.json');
    cy.interceptGql('updateCartShipping', 'e2e-updateCartShipping.json');
    cy.interceptGql('updateCartPayment', 'e2e-updateCartPayment.json');
    cy.interceptGql('createOrder', 'e2e-createOrder.json');

    cy.intercept('GET', '**/pay', (req) => {
      req.url = 'http://localhost:3000/';
    }).as('pay');

    // Add product to cart and go to checkout
    page.home.visit();
    page.home.header.categories.first().click();
    cy.interceptGql('getCart', 'e2e-getCart-withProduct.json');
    page.category.addProductToCart();
    page.product.header.openCart();
    page.cart.goToCheckoutButton.click();

    // Checkout process
    page.checkout.billing.heading.should('be.visible');
    cy.wait(1000);
    page.checkout.billing.fillForm(data.customer);
    cy.interceptGql('getCart', 'e2e-getCart-billingSubmit.json');
    page.checkout.billing.continueToShippingButton.click();
    page.checkout.shipping.heading.should('be.visible');
    cy.wait(1000);
    page.checkout.shipping.fillForm(data.customer);
    page.checkout.shipping.selectShippingButton.click();
    page.checkout.shipping.shippingMethods.first().click();
    cy.interceptGql('getCart', 'e2e-getCart-makeOrder.json');
    page.checkout.shipping.continueToPaymentButton.click();
    page.checkout.payment.paymentMethods.first().click();
    page.checkout.payment.makeAnOrderButton.click();
    cy.wait('@pay').clearCookies();
    cy.visit('http://localhost:3000/en/checkout/thank-you?order=000000010');
    page.checkout.thankyou.heading.should('be.visible');
    cy.interceptGql('getCart', 'e2e-getCart-empty.json');
  });
});
