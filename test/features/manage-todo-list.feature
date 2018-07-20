Feature: Manage todo list

  Scenario: Add todo item
    Given I have the todo list
      | Label             |
      | Clean the kitchen |
    When I write the todo item "Prepare dinner" in the input field
    And I press enter
    Then I expect the todo list to have 2 items
    And I expect to see the todo item "Prepare dinner" in the todo list

  Scenario: Delete todo item
    Given I have the todo list
      | Label             |
      | Clean the kitchen |
      | Prepare dinner    |
    When I press the delete button of the todo item "Clean the kitchen"
    Then I expect the todo list to have 1 item
    And I expect to not see the todo item "Clean the kitchen" in the todo list
