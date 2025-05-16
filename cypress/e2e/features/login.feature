Feature: Login and update users on OrangeHRM

  Scenario: Login and update users list
    Given I navigate to the login page
    When I login using "Admin" credentials
    And I go to the Admin tab
    And I get the current record count
    And I add new user using "newUser" credentials
    Then the record count should increase by 1
    When I search for the new user
    And I delete the new user
    Then the record count should decrease by 1

  
