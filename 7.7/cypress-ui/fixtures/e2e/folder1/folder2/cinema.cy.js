import selectors from '../../fixtures/selectors.json';
import logins from '../../fixtures/logins.json';

describe('Cinema UI Tests - Folder 1', () => {
  it('Should display main page correctly', () => {
    cy.visit('http://qamid.tmweb.ru/client/index.php');
    cy.get(selectors.client.day).should('have.length', 7);
  });
});