import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../pages/LoginPage';
import AdminPage from '../pages/AdminPage';

const loginPage = new LoginPage();
const adminPage = new AdminPage();

let generatedUsername = '';

Given('I navigate to the login page', () => {
  loginPage.visit();
});

When('I login using {string} credentials', (userKey) => {
  cy.fixture('userdata').then((data) => {
    const user = data[userKey];
    loginPage.fillUsername(user.username);
    loginPage.fillPassword(user.password);
    loginPage.submit();
  });
});

When('I go to the Admin tab', () => {
  adminPage.clickAdminTab();
});

When('I get the current record count', () => {
  adminPage.getUserCount().then(count => {
    cy.wrap(count).as('initialCount');
  });
});

When('I add new user using {string} credentials', (userKey) => {
  cy.fixture('userdata').then((data) => {
    adminPage.clickAddButton();
    const newUser = data[userKey];
    generatedUsername = `${newUser.usernamePrefix}${Date.now()}`;
    adminPage.fillUserForm(generatedUsername,newUser.password);
    cy.wrap(generatedUsername).as('newUsername');
    adminPage.saveUser();
  });
});

Then('the record count should increase by 1', function () {
  cy.get('@initialCount').then((initialCount) => {
    adminPage.getUserCount().should('eq', initialCount + 1);
  });
});

When('I search for the new user', function () {
  cy.get('@newUsername').then((username) => {
    adminPage.searchUser(username);
  });
});


When('I delete the new user', function () {
  cy.get('@newUsername').then((username) => {
    adminPage.deleteUser(username);
  });
});

Then('the record count should decrease by 1', function () {
  cy.get('@initialCount').then((initialCount) => {
    adminPage.getUserCount().should('eq', initialCount);
  });
});
