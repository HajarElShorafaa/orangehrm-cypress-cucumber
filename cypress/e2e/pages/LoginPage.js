import { loginSelectors } from './selectors';

class LoginPage {
  
    visit() {
      cy.visit("https://opensource-demo.orangehrmlive.com/");
    }
  
    fillUsername(username) {
      cy.get(loginSelectors.username).type(username);
    }
  
    fillPassword(password) {
      cy.get(loginSelectors.password).type(password);
    }
  
    submit() {
      cy.get(loginSelectors.loginButton).click();
    }
  }
  export default LoginPage;
  