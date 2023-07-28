import page from '../pages/factory';
import apiData from '../fixtures/api/e2e-add-product-to-cart';

context('Adding products to cart', () => {
  it(['e2e', 'happypath'], 'Should successfully add product to cart', () => {
    // Visit homepage
    cy.interceptApi('getCategory', apiData.getCategory[0]);
    cy.interceptApi('getMinimalProduct', apiData.getMinimalProduct[0]);
    cy.interceptApi('createCart', apiData.createCart[0]);
    cy.interceptApi('getCart', apiData.getCart[0]);
    page.home.visit();

    // Go to category page
    cy.interceptApi('getFirstProductId', apiData.getFirstProductId[0]);
    cy.interceptApi('getProductAttribute', apiData.getProductAttribute[0]);
    cy.interceptApi('getMinimalProduct', apiData.getMinimalProduct[0]);
    cy.interceptApi('getProductNotFiltered', apiData.getProductNotFiltered[0]);
    page.home.header.categories.first().click();

    // Add product
    cy.interceptApi('addToCart', apiData.addToCart[0]);
    page.category.addProductToCart(0);

    // Add product with quantity
    cy.interceptApi('addToCart', apiData.addToCart[1]);
    page.category.addProductToCart(1, 12, true);

    // Add product with specific variant
    cy.interceptApi('addToCart', apiData.addToCart[2]);
    page.category.addProductToCart(2, 1, true, [
      {
        selectorId: 0,
        variant: 1,
      },
    ]);

    // Check cart sidebar content
    page.category.header.openCartSidebar();
  });
});
