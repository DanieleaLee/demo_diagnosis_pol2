/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    getBySel(att: string, cb?: (sel:string)=>void) : Chainable<null>;
  }
}


Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add("getBySelLike", (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args);
});
