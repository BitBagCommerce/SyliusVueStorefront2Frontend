import page from '../pages/factory';
import apiData from '../fixtures/api/e2e-changing-quantity';

context('Changing quantity of items', () => {
  it(
    ['e2e', 'happypath'],
    'Should add product to cart with different quantities',
    () => {
      // Mocking API responses
      cy.interceptApi('getMinimalProduct', apiData.getMinimalProduct[0]);
      cy.interceptApi('getCategory', apiData.getCategory[0]);
      cy.interceptApi('createCart', apiData.createCart[0]);
      cy.interceptApi('getCart', apiData.getCart[0]);

      // Go to category page
      page.home.visit();
      cy.interceptApi(
        'getProductNotFiltered',
        apiData.getProductNotFiltered[0]
      );
      cy.interceptApi('getMinimalProduct', apiData.getMinimalProduct[1]);
      cy.interceptApi('getFirstProductId', apiData.getFirstProductId[0]);
      cy.interceptApi('getProductAttribute', apiData.getProductAttribute[0]);
      page.home.header.categories.first().click();

      // Change quantity using buttons

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
      cy.interceptApi('addToCart', apiData.addToCart[0]);
      page.productModal.addToCartButton.click();

      // Change quantity using input
      cy.interceptApi('addToCart', apiData.addToCart[1]);

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
