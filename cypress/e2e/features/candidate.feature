Feature: Manage candidates via API

  Scenario: Add and delete a candidate using API
    Given I navigate to the login page
    When I login using "Admin" credentials
    Then I navigate to the candidate page
    When I add a new candidate using API
    When I delete the candidate using API

