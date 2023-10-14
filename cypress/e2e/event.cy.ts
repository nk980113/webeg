/// <reference types="cypress" />

describe('OnClick Test', () => {
  it('Does register event', () => {
    cy.visit('testcases/event/page.html');

    cy.get('#control-ev')
      .click()
      .should('contain.text', 'This piece of text is controlled by event listener!');

    cy.get('#control-ref')
      .click()
      .should('contain.text', 'This piece of text is controlled by webeg refs!');
  });
});
