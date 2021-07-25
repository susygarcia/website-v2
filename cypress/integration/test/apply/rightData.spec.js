context('Test Apply page with correct data', () => {

  it('Visit the Apply page with path "/us/apply"', () => {
    cy.visit('/us/apply').wait(3500);
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/us/apply');
    });
  });

  it('Call the form and fill with right values', () => {
    // It gets data in fixtures folder to fill form
    cy.fixture('/apply/names.json').then((data) => {
      const { firstName } = data.user;

      cy.get('[data-cy=first_name]')
        .click().wait(200)
        .should('have.css', 'border-color', 'rgb(0, 0, 0)') // focus the form
        .type(firstName);
      });

    cy.get('[data-cy=dropdown_program_selector]')
      .click().wait(200)
      .wait(1500); // Gets Drowpdown of Courses
    cy.get('#react-select-2-option-1').click(); // Selects Level 1 with position 0
    
    cy.get('[data-cy=dropdown_academy_selector]')
      .click().wait(1200)
    cy.get('#react-select-3-option-0').click();

    cy.fixture('/apply/form_values/right.json').each((right) => {
      cy.get('[data-cy=email]')
        .click().wait(200)
        .should('have.css', 'border-color', 'rgb(0, 0, 0)')
        .wait(200)
        .clear()
        .type(right.email);

      cy.get('[data-cy=phone]')
        .click().wait(200)
        .should('have.css', 'border-color', 'rgb(0, 0, 0)')
        .wait(500)
        .clear()
        .type(right.phone);
    });
  });

  it('Should submit the form and redirect to thank-you page', () => {
    // cy.log(Cypress.env('GATSBY_BREATHECODE_HOST'))
    cy.get('Button[type="submit"]')
      .contains('APPLY')
      .click().wait(3500);
      // Por alguna razon location no funciona en github actions
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/us/thank-you');
    });
  });
});
