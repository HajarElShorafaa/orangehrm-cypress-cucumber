import { adminSelectors } from './selectors';

class AdminPage {
    clickAdminTab() {
      cy.get(adminSelectors.adminTab).click();
    }
  
    getUserCount() {
      return cy.get(adminSelectors.userTable).find(adminSelectors.userRow).its('length');
    }
  
    clickAddButton() {
      cy.get(adminSelectors.button).contains('Add').click();
    }
  
    fillUserForm(username, password) {
      cy.get(adminSelectors.dropdownButton).eq(0).click();
      cy.get(adminSelectors.dropdownElement).contains('Admin').click();

      cy.get(adminSelectors.userdataInputfield).eq(0).type('em');
      cy.wait(3000);
      cy.get(adminSelectors.autocomplete).eq(0).click();


      cy.get(adminSelectors.dropdownButton).eq(1).click();
      cy.get(adminSelectors.dropdownElement).contains('Enabled').click();
  
      cy.get(adminSelectors.userdataInputfield).eq(1).type(username); // Username
      cy.get(adminSelectors.userdataInputfield).eq(2).type(password); // Password
      cy.get(adminSelectors.userdataInputfield).eq(3).type(password); // Confirm Password
    }
  
    saveUser() {
      cy.get(adminSelectors.button).contains('Save').click();
      cy.wait(2000);
    }
  
    searchUser(username) {
      cy.get(adminSelectors.inputField).eq(1).clear().type(username);
      cy.get(adminSelectors.button).contains('Search').click();
    }
  
    deleteUser(username) {
      cy.contains(adminSelectors.userRow, username).within(() => {
        cy.get(adminSelectors.button).eq(0).click(); // Delete button
      });
      cy.get(adminSelectors.button).contains('Yes, Delete').click();
      cy.get(adminSelectors.inputField).eq(1).clear();
    }
  }
  
  export default AdminPage;