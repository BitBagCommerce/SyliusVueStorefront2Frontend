import page from '../pages/factory';

context('Adding products to cart', () => {
  it(['e2e', 'happypath'], 'Should successfully add product to cart', () => {
    const apiData = {};
    cy.intercept('POST', '/api/sylius/**', (req) => {
      // Regex gets everything to /sylius/ including /sylius/ and it is replaced with empty string
      // Exaple url: http://localhost:8000/api/sylius/getCart
      // This way we get only the data name (getCart, addProductToCart, etc.)
      const dataName = req.url.replace(/.*\/sylius\//, '');
      req.reply((res) => {
        if (apiData[dataName] === undefined) {
          apiData[dataName] = [res.body];
        } else {
          apiData[dataName].push(res.body);
        }
      });
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

    cy.wait(4000).then(() => {
      cy.writeFile(
        'fixtures/api/e2e-add-product-to-cart.ts',
        'const apiData = ' +
          JSON.stringify(apiData) +
          ';\n\nexport default apiData;\n'
      ).then(() => {
        console.log('Responses data file written!');
        cy.wait(2000);
      });
    });
  });
});
