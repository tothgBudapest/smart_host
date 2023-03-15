describe('Smart Host', () => {
    it('should calculate results for 3 free premium rooms and 3 free economy rooms', () => {
        cy.visit('http://localhost:3000/');
        cy.get('[data-testid="index_input_premium"]')
            .type(3)
            .find('input')
            .invoke('val')
            .should('equal', '3');
        cy.get('[data-testid="index_input_economy"]')
            .type(3)
            .find('input')
            .invoke('val')
            .should('equal', '3');
        cy.get('[data-testid="index_calculate_button"]').click();

        cy.get('[data-testid="premium_free_rooms"]').contains('3').should('be.visible');
        cy.get('[data-testid="premium_usage"]').contains('3').should('be.visible');
        cy.get('[data-testid="premium_profit"]').contains('738 €').should('be.visible');

        cy.get('[data-testid="economy_free_rooms"]').contains('3').should('be.visible');
        cy.get('[data-testid="economy_usage"]').contains('3').should('be.visible');
        cy.get('[data-testid="economy_profit"]').contains('167 €').should('be.visible');
    });

    it('should calculate results for 7 free premium rooms and 5 free economy rooms', () => {
        cy.visit('http://localhost:3000/');
        cy.get('[data-testid="index_input_premium"]')
            .type(7)
            .find('input')
            .invoke('val')
            .should('equal', '7');
        cy.get('[data-testid="index_input_economy"]')
            .type(5)
            .find('input')
            .invoke('val')
            .should('equal', '5');
        cy.get('[data-testid="index_calculate_button"]').click();

        cy.get('[data-testid="premium_free_rooms"]').contains('7').should('be.visible');
        cy.get('[data-testid="premium_usage"]').contains('6').should('be.visible');
        cy.get('[data-testid="premium_profit"]').contains('1.054 €').should('be.visible');

        cy.get('[data-testid="economy_free_rooms"]').contains('5').should('be.visible');
        cy.get('[data-testid="economy_usage"]').contains('4').should('be.visible');
        cy.get('[data-testid="economy_profit"]').contains('189 €').should('be.visible');
    });

    it('should calculate results for 2 free premium rooms and 7 free economy rooms', () => {
        cy.visit('http://localhost:3000/');
        cy.get('[data-testid="index_input_premium"]')
            .type(2)
            .find('input')
            .invoke('val')
            .should('equal', '2');
        cy.get('[data-testid="index_input_economy"]')
            .type(7)
            .find('input')
            .invoke('val')
            .should('equal', '7');
        cy.get('[data-testid="index_calculate_button"]').click();

        cy.get('[data-testid="premium_free_rooms"]').contains('2').should('be.visible');
        cy.get('[data-testid="premium_usage"]').contains('2').should('be.visible');
        cy.get('[data-testid="premium_profit"]').contains('583 €').should('be.visible');

        cy.get('[data-testid="economy_free_rooms"]').contains('7').should('be.visible');
        cy.get('[data-testid="economy_usage"]').contains('4').should('be.visible');
        cy.get('[data-testid="economy_profit"]').contains('189 €').should('be.visible');
    });

    it('should calculate results for 7 free premium rooms and 1 free economy rooms', () => {
        cy.visit('http://localhost:3000/');
        cy.get('[data-testid="index_input_premium"]')
            .type(7)
            .find('input')
            .invoke('val')
            .should('equal', '7');
        cy.get('[data-testid="index_input_economy"]')
            .type(1)
            .find('input')
            .invoke('val')
            .should('equal', '1');
        cy.get('[data-testid="index_calculate_button"]').click();

        cy.get('[data-testid="premium_free_rooms"]').contains('7').should('be.visible');
        cy.get('[data-testid="premium_usage"]').contains('7').should('be.visible');
        cy.get('[data-testid="premium_profit"]').contains('1.153 €').should('be.visible');

        cy.get('[data-testid="economy_free_rooms"]').contains('1').should('be.visible');
        cy.get('[data-testid="economy_usage"]').contains('1').should('be.visible');
        cy.get('[data-testid="economy_profit"]').contains('45 €').should('be.visible');
    });
});
