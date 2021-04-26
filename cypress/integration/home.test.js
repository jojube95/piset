

describe('Home Page', () => {

    it('user login', () => {

        cy.visit('/');

        cy.contains('Environment: test');

        //cy.get('#signInButton').should('be.disabled');
        cy.get('#signUpButton').should('not.be.disabled');

        cy.get('#mail').type('user1@user.com');

        cy.get('#password').type('useruser');

        cy.get('#signInButton').should('not.be.disabled');
        cy.get('#signUpButton').should('not.be.disabled');

        cy.get('#signInButton').click();

        cy.url().should('contain', '/main/tasks');
    });
});
