describe('Trivia Game', () => {
    it('Should start the game and display the first question', () => {
        cy.visit('index.html');
        cy.get('#start-game-superman').click();
        cy.get('#game-area').should('contain', 'Q1');
    });

    it('Should correctly handle answers', () => {
        cy.get('input[name="answer"]').first().click();
        cy.get('#modal-message').should('contain', 'Correct').or('contain', 'Incorrect');
        cy.get('#next-question-modal-button').click();
        cy.get('#game-area').should('not.be.empty');
    });
});
