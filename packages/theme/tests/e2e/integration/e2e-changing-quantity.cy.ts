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

context('Changing quantity of items', () => {
  it(
    ['e2e', 'happypath'],
    'Should add product to cart with different quantities',
    () => {
      // let currentCart = getCart.empty;

      // Mocking API responses
      // cy.interceptApi('getMinimalProduct', getMinimalProduct.minimalProducts);
      // cy.interceptApi('getCategory', getCategory.categories);
      // cy.interceptApi('createCart', createCart.cart);
      // cy.interceptApi('getCart', currentCart);
      // cy.interceptApi('getFirstProductId', getFirstProductId.firstProductId);
      // cy.interceptApi(
      //   'getProductAttribute',
      //   getProductAttribute.productAttributes
      // );
      // cy.interceptApi('addToCart', addToCart.singleProduct);
      // cy.interceptApi(
      //   'getProductNotFiltered',
      //   getProductNotFiltered.productsNotFiltered
      // );

      // Go to category page
      page.home.visit();
      page.home.header.categories.first().click();

      // Change quantity using buttons
      // cy.wait(10).then(() => {
      //   currentCart = getCartModifications.addProduct(currentCart, 8);
      //   cy.interceptApi('addToCart', currentCart);
      // });

      // Open product modal
      page.category.addToCartButton.eq(0).click();
      page.productModal.addToCartButton.should('be.visible');
      // Decrease quantity (should not go below 1)
      page.productModal.quantitySelector.decreaseQuantity(2);
      page.productModal.quantitySelector.quantityInput.should(
        'have.value',
        '1'
      );
      // Increase quantity to 10
      page.productModal.quantitySelector.increaseQuantity(9);
      page.productModal.quantitySelector.quantityInput.should(
        'have.value',
        '10'
      );
      // Decrease quantity to 8
      page.productModal.quantitySelector.decreaseQuantity(2);
      page.productModal.quantitySelector.quantityInput.should(
        'have.value',
        '8'
      );
      // Add to cart
      page.productModal.addToCartButton.click();

      // Change quantity using input
      // cy.wait(10).then(() => {
      //   currentCart = getCartModifications.addProduct(currentCart, 12, 1);
      //   cy.interceptApi('addToCart', currentCart);
      // });

      page.category.addProductToCart(1, 12, true);

      // Check cart sidebar content
      page.category.header.openCartSidebar();
      page.cartSidebar.quantitySelector.quantityInput
        .eq(0)
        .should('have.value', '8');
      page.cartSidebar.quantitySelector.quantityInput
        .eq(1)
        .should('have.value', '12');
    }
  );
});
