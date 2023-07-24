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
    const apiData = {};
    cy.intercept('POST', '/api/sylius/**', () => {}).as('interceptedApiCall');

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

    // cy.writeFile('fixtures/api/testdata.ts', 'const apiData = {');
    cy.wait('@interceptedApiCall').then((interception) => {
      const dataName = interception.request.url.replace(/.*\/sylius\//, '');
      if (apiData[dataName] === undefined) {
        apiData[dataName] = interception.response.body;
        console.log('added');
      } else {
        apiData[dataName] = [
          ...JSON.parse(apiData[dataName]),
          interception.response.body,
        ];
      }
    });

    cy.wait('@interceptedApiCall').then((interception) => {
      const dataName = interception.request.url.replace(/.*\/sylius\//, '');
      if (apiData[dataName] === undefined) {
        apiData[dataName] = interception.response.body;
        console.log('added');
      } else {
        apiData[dataName] = [
          ...JSON.parse(apiData[dataName]),
          interception.response.body,
        ];
      }
    });
    cy.wait('@interceptedApiCall').then((interception) => {
      const dataName = interception.request.url.replace(/.*\/sylius\//, '');
      if (apiData[dataName] === undefined) {
        apiData[dataName] = interception.response.body;
        console.log('added');
      } else {
        apiData[dataName] = [
          ...JSON.parse(apiData[dataName]),
          interception.response.body,
        ];
      }
    });
    cy.wait('@interceptedApiCall').then((interception) => {
      const dataName = interception.request.url.replace(/.*\/sylius\//, '');
      if (apiData[dataName] === undefined) {
        apiData[dataName] = interception.response.body;
        console.log('added');
      } else {
        apiData[dataName] = [
          ...JSON.parse(apiData[dataName]),
          interception.response.body,
        ];
      }
    });

    page.home.header.categories.first().click();

    cy.wait('@interceptedApiCall').then((interception) => {
      const dataName = interception.request.url.replace(/.*\/sylius\//, '');
      if (apiData[dataName] === undefined) {
        apiData[dataName] = interception.response.body;
        console.log('added');
      } else {
        apiData[dataName] = [
          ...JSON.parse(apiData[dataName]),
          interception.response.body,
        ];
      }
    });
    cy.wait('@interceptedApiCall').then((interception) => {
      const dataName = interception.request.url.replace(/.*\/sylius\//, '');
      if (apiData[dataName] === undefined) {
        apiData[dataName] = interception.response.body;
        console.log('added');
      } else {
        apiData[dataName] = [apiData[dataName], interception.response.body];
      }
    });
    cy.wait('@interceptedApiCall').then((interception) => {
      const dataName = interception.request.url.replace(/.*\/sylius\//, '');
      if (apiData[dataName] === undefined) {
        apiData[dataName] = interception.response.body;
        console.log('added');
      } else {
        apiData[dataName] = [apiData[dataName], interception.response.body];
      }
    });
    cy.wait('@interceptedApiCall').then((interception) => {
      const dataName = interception.request.url.replace(/.*\/sylius\//, '');
      if (apiData[dataName] === undefined) {
        apiData[dataName] = interception.response.body;
        console.log('added');
      } else {
        apiData[dataName] = [apiData[dataName], interception.response.body];
      }
    });

    // Add product
    // cy.wait(10).then(() => {
    //   currentCart = getCartModifications.addProduct(currentCart);
    //   cy.interceptApi('addToCart', currentCart);
    // });

    page.category.addProductToCart(0);

    cy.wait('@interceptedApiCall').then((interception) => {
      const dataName = interception.request.url.replace(/.*\/sylius\//, '');
      if (apiData[dataName] === undefined) {
        apiData[dataName] = interception.response.body;
        console.log('added');
      } else {
        apiData[dataName] = [apiData[dataName], interception.response.body];
      }
    });

    // Add product with quantity
    // cy.wait(10).then(() => {
    //   currentCart = getCartModifications.addProduct(currentCart, 12, 1);
    //   cy.interceptApi('addToCart', currentCart);
    // });

    page.category.addProductToCart(1, 12, true);

    cy.wait('@interceptedApiCall').then((interception) => {
      const dataName = interception.request.url.replace(/.*\/sylius\//, '');
      if (apiData[dataName] === undefined) {
        apiData[dataName] = interception.response.body;
        console.log('added');
      } else {
        apiData[dataName] = [apiData[dataName], interception.response.body];
      }
    });

    // Add product with specific variant
    // cy.wait(10).then(() => {
    //   currentCart = getCartModifications.addProduct(
    //     currentCart,
    //     1,
    //     2,
    //     't_shirts',
    //     [{ option: 't_shirt_size', id: 1 }]
    //   );
    //   cy.interceptApi('addToCart', currentCart);
    // });

    page.category.addProductToCart(2, 1, true, [
      {
        selectorId: 0,
        variant: 1,
        expectedValue:
          getMinimalProduct.minimalProducts.products[2].options[0].values[1]
            .code,
      },
    ]);

    cy.wait('@interceptedApiCall').then((interception) => {
      const dataName = interception.request.url.replace(/.*\/sylius\//, '');
      if (apiData[dataName] === undefined) {
        apiData[dataName] = interception.response.body;
        console.log('added');
      } else {
        apiData[dataName] = [apiData[dataName], interception.response.body];
      }
      cy.writeFile(
        'fixtures/api/testdata.ts',
        'const apiData = ' +
          JSON.stringify(apiData) +
          ';\n\nexport default apiData;'
      );
    });

    // Check cart sidebar content
    page.category.header.openCartSidebar();
  });
});
