declare namespace Cypress {
  interface Chainable<> {
    interceptGQL(url: string, path: string): Chainable<any>;
  }
}
