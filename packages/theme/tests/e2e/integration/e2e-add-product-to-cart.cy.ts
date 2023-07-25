import page from '../pages/factory';

context('Adding products to cart', () => {
  it(['e2e', 'happypath'], 'Should successfully add product to cart', () => {
    let apiData = {};
    cy.dataAutogenIntercepts(apiData).then((newData) => {
      apiData = newData;
    });

    // Go to category page
    page.home.visit();
    page.home.header.categories.first().click();

    // Add product
    page.category.addProductToCart(0);

    // Add product with quantity
    page.category.addProductToCart(1, 12, true);

    // Add product with specific variant=
    page.category.addProductToCart(2, 1, true, [
      {
        selectorId: 0,
        variant: 1,
      },
    ]);

    // Check cart sidebar content
    page.category.header.openCartSidebar();

    cy.dataAutogenSaveToFile(apiData, 'e2e-add-product-to-cart');
  });
});
