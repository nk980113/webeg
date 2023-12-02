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

describe('Function component test', () => {
  beforeEach(() => {
    cy.visit('testcases/fc/page.html');
  });

  it('Does render', () => {
    cy.get('#container')
      .should('contain.html', '<div id="created-by-fc">I\'m created with function components!</div>');
  });

  it('Passes props properly', () => {
    cy.get('#with-props')
      .should('contain.text', 'This text is controlled with props!');
  });

  it('Passes children as prop', () => {
    cy.get('#with-children')
      .should('contain.html', '<div>I\'m a children!</div>');
  });
});
