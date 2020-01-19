describe('Game app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:8000/api/test/reset');
  });

  it('front page can be opened', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Uusi peli');
  });

  it('new game can be started', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Uusi peli')
      .click();
    cy.contains('Pelaa');
    cy.contains('Pisteet: 20');
  });

  it('game can be played', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Uusi peli')
      .click();
    cy.contains('Pelaa')
      .click();
    cy.contains('Sait 0 pistettä, seuraavaan voittoon 9 painallusta!');
    cy.contains('Pisteet: 19');
  });

  it('game shows reward when you win', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Uusi peli')
      .click();
    for (let i = 0; i < 10; i++) {
      cy.contains('Pelaa')
        .click();
    }
    cy.contains('Sait 5 pistettä, seuraavaan voittoon 10 painallusta!');
    cy.contains('Pisteet: 15');
  });

  it('game shows restart button when you have 0 points', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Uusi peli')
      .click();
    for (let i = 0; i < 35; i++) {
      cy.contains('Pelaa')
        .click();
    }
    cy.contains('Aloita alusta');
    cy.contains('Pisteet: 0');
  });
});
