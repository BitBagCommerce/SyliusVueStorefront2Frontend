context('Try using backend', () => {
  it(['e2e', 'happypath'], 'Should successfully go to backend ulr', () => {
    cy.visit('http://localhost:8000/');
    cy.wait(10000);
  });
  it(
    ['e2e', 'happypath'],
    'Should successfully go to backend admin ulr',
    () => {
      cy.visit('http://localhost:8000/admin');
      cy.wait(10000);
    }
  );
});
