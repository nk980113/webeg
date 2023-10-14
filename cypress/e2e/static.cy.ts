/// <reference types="cypress" />

describe('Static Test', () => {
  it('Does render', () => {
    cy.visit('testcases/static/page.html');
    cy.get('#contains-p')
      .should('contain.html', '<p>Hello, world!</p>');
  });
});
