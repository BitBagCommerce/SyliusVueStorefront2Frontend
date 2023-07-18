import page from '../pages/factory';
import {
  getCategory,
  getMinimalProduct,
  getFirstProductId,
  getCart,
  getProductAttribute,
  addToCart,
  getProductNotFiltered,
  createCart,
} from '../fixtures/api/e2e-api-responses';
import { getCartModifications } from '../fixtures/api/e2e-api-responses-modifications';

context('Adding products to cart', () => {
  it(['e2e', 'happypath'], 'Should successfully add product to cart', () => {
    let currentCart = getCart.empty;

    // Mocking API responses
    cy.interceptApi('getMinimalProduct', getMinimalProduct.minimalProducts);
    cy.interceptApi('getCategory', getCategory.categories);
    cy.interceptApi('createCart', createCart.cart);
    cy.interceptApi('getCart', currentCart);
    cy.interceptApi('getFirstProductId', getFirstProductId.firstProductId);
    cy.interceptApi(
      'getProductAttribute',
      getProductAttribute.productAttributes
    );
    cy.interceptApi('addToCart', addToCart.singleProduct);
    cy.interceptApi(
      'getProductNotFiltered',
      getProductNotFiltered.productsNotFiltered
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

    // Go to category page
    page.home.visit();
    page.home.header.categories.first().click();

    // Add product
    cy.wait(10).then(() => {
      currentCart = getCartModifications.addProduct(currentCart, 8);
      cy.interceptApi('addToCart', currentCart);
    });

    page.category.addProductToCart(0);

    // Add product with quantity
    cy.wait(10).then(() => {
      currentCart = getCartModifications.addProduct(currentCart, 12, 1);
      cy.interceptApi('addToCart', currentCart);
    });

    page.category.addProductToCart(1, 12, true);

    // Add product with specific variant
    cy.wait(10).then(() => {
      currentCart = getCartModifications.addProduct(currentCart, 1, 2);
      cy.interceptApi('addToCart', currentCart);
    });

    page.category.addProductToCart(2, 1, true, [
      {
        selectorId: 0,
        variant: 1,
        compareValue:
          getMinimalProduct.minimalProducts.products[2].options[0].values[1]
            .code,
      },
    ]);

    // Check cart sidebar content
    page.product.header.openCart();
  });
});
