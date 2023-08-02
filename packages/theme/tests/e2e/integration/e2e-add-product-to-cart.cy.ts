import page from '../pages/factory';
import apiDataProduct from '../fixtures/api/e2e-add-product-to-cart/e2e-product';
import apiDataQuantity from '../fixtures/api/e2e-add-product-to-cart/e2e-product-with-quantity';
import apiDataVariant from '../fixtures/api/e2e-add-product-to-cart/e2e-product-with-variant';

context('Adding products to cart', () => {
  it(['e2e', 'happypath'], 'Should successfully add product to cart', () => {
    // Visit homepage
    cy.interceptApi('getCategory', apiDataProduct.getCategory[0]);
    cy.interceptApi('getMinimalProduct', apiDataProduct.getMinimalProduct[0]);
    cy.interceptApi('createCart', apiDataProduct.createCart[0]);
    cy.interceptApi('getCart', apiDataProduct.getCart[0]);
    page.home.visit();

    // Go to category page
    cy.interceptApi('getFirstProductId', apiDataProduct.getFirstProductId[0]);
    cy.interceptApi(
      'getProductAttribute',
      apiDataProduct.getProductAttribute[0]
    );
    cy.interceptApi('getMinimalProduct', apiDataProduct.getMinimalProduct[1]);
    cy.interceptApi(
      'getProductNotFiltered',
      apiDataProduct.getProductNotFiltered[0]
    );
    page.home.header.categories.first().click();

    // Add product
    cy.interceptApi('addToCart', apiDataProduct.addToCart[0]);
    page.category.addProductToCart(0);

    // Check cart sidebar content
    page.category.header.openCartSidebar();
  });

  it(
    ['e2e', 'happypath'],
    'Should successfully add product to cart that has no variant options',
    () => {
      // Visit homepage
      // cy.interceptApi('getCategory', apiDataProduct.getCategory[0]);
      // cy.interceptApi('getMinimalProduct', apiDataProduct.getMinimalProduct[0]);
      // cy.interceptApi('createCart', apiDataProduct.createCart[0]);
      // cy.interceptApi('getCart', apiDataProduct.getCart[0]);
      page.home.visit();

      // Go to category page
      // cy.interceptApi('getFirstProductId', apiDataProduct.getFirstProductId[0]);
      // cy.interceptApi(
      //   'getProductAttribute',
      //   apiDataProduct.getProductAttribute[0]
      // );
      // cy.interceptApi('getMinimalProduct', apiDataProduct.getMinimalProduct[1]);
      // cy.interceptApi(
      //   'getProductNotFiltered',
      //   apiDataProduct.getProductNotFiltered[0]
      // );
      page.home.header.categories.eq(1).click();

      // Add product
      // cy.interceptApi('addToCart', apiDataProduct.addToCart[0]);
      page.category.addProductToCart(0);

      // Check cart sidebar content
      page.category.header.openCartSidebar();
    }
  );

  it(
    ['e2e', 'happypath'],
    'Should successfully add product with quantity to cart',
    () => {
      // Visit homepage
      cy.interceptApi('getCategory', apiDataQuantity.getCategory[0]);
      cy.interceptApi(
        'getMinimalProduct',
        apiDataQuantity.getMinimalProduct[0]
      );
      cy.interceptApi('createCart', apiDataQuantity.createCart[0]);
      cy.interceptApi('getCart', apiDataQuantity.getCart[0]);
      page.home.visit();

      // Go to category page
      cy.interceptApi(
        'getFirstProductId',
        apiDataQuantity.getFirstProductId[0]
      );
      cy.interceptApi(
        'getProductAttribute',
        apiDataQuantity.getProductAttribute[0]
      );
      cy.interceptApi(
        'getMinimalProduct',
        apiDataQuantity.getMinimalProduct[1]
      );
      cy.interceptApi(
        'getProductNotFiltered',
        apiDataQuantity.getProductNotFiltered[0]
      );
      page.home.header.categories.first().click();

      // Add product with quantity
      cy.interceptApi('addToCart', apiDataQuantity.addToCart[0]);
      page.category.addProductToCart(1, 12, true);

      // Check cart sidebar content
      page.category.header.openCartSidebar();
    }
  );

  it(
    ['e2e', 'happypath'],
    'Should successfully add product with variant to cart',
    () => {
      // Visit homepage
      cy.interceptApi('getCategory', apiDataVariant.getCategory[0]);
      cy.interceptApi('getMinimalProduct', apiDataVariant.getMinimalProduct[0]);
      cy.interceptApi('createCart', apiDataVariant.createCart[0]);
      cy.interceptApi('getCart', apiDataVariant.getCart[0]);
      page.home.visit();

      // Go to category page
      cy.interceptApi('getFirstProductId', apiDataVariant.getFirstProductId[0]);
      cy.interceptApi(
        'getProductAttribute',
        apiDataVariant.getProductAttribute[0]
      );
      cy.interceptApi('getMinimalProduct', apiDataVariant.getMinimalProduct[1]);
      cy.interceptApi(
        'getProductNotFiltered',
        apiDataVariant.getProductNotFiltered[0]
      );
      page.home.header.categories.first().click();

      // Add product with specific variant
      cy.interceptApi('addToCart', apiDataVariant.addToCart[0]);
      page.category.addProductToCart(2, 1, true, [
        {
          selectorId: 0,
          variant: 1,
        },
      ]);

      // Check cart sidebar content
      page.category.header.openCartSidebar();
    }
  );
});
