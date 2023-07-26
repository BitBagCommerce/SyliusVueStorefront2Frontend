/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('interceptApi', (urlEnding, data) => {
  cy.intercept('POST', '/api/sylius/' + urlEnding, (req) => {
    req.url = '/api/sylius/' + urlEnding;
    req.reply({ body: data });
  });
});

Cypress.Commands.add('el', (selector, children, options) => {
  return children
    ? cy.get(`[data-e2e="${selector}"] ${children}`, options)
    : cy.get(`[data-e2e="${selector}"]`, options);
});

Cypress.Commands.add('vsfUiEl', (selector, children, options) => {
  return children
    ? cy.get(`[data-testid="${selector}"] ${children}`, options)
    : cy.get(`[data-testid="${selector}"]`, options);
});

Cypress.Commands.add('dataAutogenIntercept', (apiData) => {
  cy.intercept('POST', '/api/sylius/**', (req) => {
    // Regex gets everything to /sylius/ including /sylius/ and it is replaced with empty string
    // Example url: http://localhost:8000/api/sylius/getCart
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
  return cy.wrap(apiData);
});

Cypress.Commands.add('dataAutogenSaveToFile', (apiData, fileName) => {
  cy.wait(4000).then(() => {
    cy.writeFile(
      'fixtures/api/' + fileName + '.ts',
      'const apiData = ' +
        JSON.stringify(apiData) +
        ';\n\nexport default apiData;\n'
    ).then(() => {
      console.log(
        'Responses data file saved!',
        '\n',
        'Location: e2e/fixtures/api/' + fileName + '.ts'
      );
      cy.wait(2000);
    });
  });
});
