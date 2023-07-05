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
    cy.interceptGql('getCart', 'e2e-getCartEmpty.json');
    cy.interceptGql('getFirstProductId', 'e2e-getFirstProductId.json');
    cy.interceptGql('getProductAttribute', 'e2e-getProductAttribute.json');
    cy.interceptGql('getCountries', 'e2e-getCountries.json');
    cy.interceptGql('addToCart', 'e2e-addToCart.json');
    cy.interceptGql('addAddress', 'e2e-addAddress.json');
    cy.interceptGql('getProductNotFiltered', 'e2e-getProductNotFiltered.json');
    cy.interceptGql('getShippingMethods', 'e2e-getShippingMethods.json');
    cy.interceptGql('updateCartShipping', 'e2e-updateCartShipping.json');

    // Add product to cart and go to checkout
    page.home.visit();
    page.home.header.categories.first().click();
    cy.interceptGql('getCart', 'e2e-getCartWithProduct.json');
    page.category.addProductToCart();
    page.product.header.openCart();
    page.cart.goToCheckoutButton.click();

    // Checkout process
    page.checkout.billing.heading.should('be.visible');
    cy.wait(1000);
    page.checkout.billing.fillForm(data.customer);
    cy.interceptGql('getCart', 'e2e-getCartBillingSubmit.json');
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
