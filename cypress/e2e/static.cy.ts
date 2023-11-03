/// <reference types="cypress" />

describe('Static Test', () => {
  beforeEach(() => {
    cy.visit('testcases/static/page.html');
  });

  it('Does render', () => {
    cy.get('#contains-p')
      .should('contain.html', '<p>Hello, world!</p>');
  });

  it('Does style', () => {
    cy.get('#contains-style')
      .should('have.css', 'background-color', 'rgb(255, 0, 0)')
      .should('have.css', 'color', 'rgb(255, 165, 0)');
  });

  it('Does not overwrite default styles', () => {
    cy.get('#contains-style')
      .should('have.css', 'font-size', '16px')
      .should('have.css', 'font-family', '"Times New Roman"');
  });
});
