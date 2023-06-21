type Options = Parameters<typeof cy.get>[1];

export function el(selector: string, children?: string, options?: Options) {
  return children
    ? cy.get(`[data-e2e="${selector}"] ${children}`, options)
    : cy.get(`[data-e2e="${selector}"]`, options);
}
