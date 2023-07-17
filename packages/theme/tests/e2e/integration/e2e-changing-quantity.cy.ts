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

context('Order placement with coupon code', () => {
  it(
    ['e2e', 'happypath'],
    'Should successfully place an order with coupon code',
    () => {
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

      // Go to category page
      page.home.visit();
      page.home.header.categories.first().click();

      // Change quantity using buttons
      cy.wait(10).then(() => {
        currentCart = getCartModifications.addProduct(currentCart, 8);
        cy.interceptApi('addToCart', currentCart);
      });

      page.category.addProductToCart(0, 8);

      // Change quantity using input
      cy.wait(10).then(() => {
        currentCart = getCartModifications.addProduct(currentCart, 12, 1);
        cy.interceptApi('addToCart', currentCart);
      });

      page.category.addProductToCart(1, 12, true);

      // Check cart sidebar content
      page.product.header.openCart();
      page.product.quantityInput.eq(0).should('have.value', '8');
      page.product.quantityInput.eq(1).should('have.value', '12');
    }
  );
});
