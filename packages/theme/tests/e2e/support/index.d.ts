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
    dataAutogenIntercept(
      apiData: Record<string, unknown>
    ): Chainable<Record<string, unknown>>;
    dataAutogenSaveToFile(
      apiData: Record<string, unknown>,
      fileName: string
    ): void;
  }

  interface Chainable<> {
    el(selector: string, children?: string, options?: Options): Chainable<any>;
    interceptApi(
      urlEnding: string,
      data: Record<string, unknown> | Record<string, unknown>[]
    ): Chainable<any>;
    vsfUiEl(
      selector: string,
      children?: string,
      options?: Options
    ): Chainable<any>;
  }
}
