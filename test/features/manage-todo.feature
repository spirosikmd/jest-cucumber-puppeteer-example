Feature: Manage todo

  Scenario: Add todo
    Given I have a todo "clean the kitchen"
    When I write the todo in the input field
    And I click enter
    Then I expect to see the todo in the list
