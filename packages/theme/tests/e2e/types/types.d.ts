declare namespace Cypress {
  interface Chainable<> {
    interceptApi(
      url: string,
      data: Record<string, unknown> | Record<string, unknown>[]
    ): Chainable<any>;
  }
}
