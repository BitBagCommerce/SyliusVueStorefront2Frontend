context('Try using backend', () => {
  it(['e2e', 'happypath'], 'Should successfully go to backend ulr', () => {
    cy.visit('http://localhost:8080/', { failOnStatusCode: false });
    cy.wait(10000);
  });
  it(
    ['e2e', 'happypath'],
    'Should successfully go to backend admin ulr',
    () => {
      cy.visit('http://localhost:8080/admin', { failOnStatusCode: false });
      cy.wait(10000);
    }
  );
});
