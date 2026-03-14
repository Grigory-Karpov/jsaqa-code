import selectors from '../../fixtures/selectors.json';
import logins from '../../fixtures/logins.json';

describe('Extra Test 1 - Folder 1', () => {
  it('Should load admin page and login', () => {
    cy.visit('http://qamid.tmweb.ru/admin/');
    cy.get(selectors.admin.emailInput).type(logins.valid.email);
    cy.get(selectors.admin.passInput).type(logins.valid.password);
    cy.get(selectors.admin.loginBtn).click();
    cy.contains('Управление залами').should('be.visible');
  });
});