/* eslint-disable spaced-comment */
///  <reference types='cypress-tags' />
///  <reference types='cypress-pipe' />
type Options = Parameters<typeof cy.get>[1];

declare namespace Cypress {
  interface Chainable {
    fixtures?: any;
  }

  interface cy {
    fixtures: { data: any };
  }

  interface Chainable<> {
    interceptApi(
      url: string,
      data: Record<string, unknown> | Record<string, unknown>[]
    ): Chainable<any>;
  }

  interface Chainable<> {
    el(selector: string, children?: string, options?: Options): Chainable<any>;
  }
  interface Chainable<> {
    vsfUiEl(
      selector: string,
      children?: string,
      options?: Options
    ): Chainable<any>;
  }
}
