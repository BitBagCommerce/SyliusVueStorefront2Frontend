type Options = Parameters<typeof cy.get>[1];

export function el(selector: string, children?: string, options?: Options) {
  return children
    ? cy.get(`[data-e2e="${selector}"] ${children}`, options)
    : cy.get(`[data-e2e="${selector}"]`, options);
}

export function vsfUiEl(
  selector: string,
  children?: string,
  options?: Options
) {
  return children
    ? cy.get(`[data-testid="${selector}"] ${children}`, options)
    : cy.get(`[data-testid="${selector}"]`, options);
}
