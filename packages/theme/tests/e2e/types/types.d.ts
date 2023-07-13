declare namespace Cypress {
  interface Chainable<> {
    interceptGql(url: string, path: string): Chainable<any>;
  }
}
