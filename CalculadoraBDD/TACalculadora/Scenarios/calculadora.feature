Feature: Calculator basic operations

  Scenario: Addition of two numbers
    Given the user opens the Calculator application
    When the user enters the number 7
    And the user presses the addition button
    And the user enters the number 5
    And the user presses the equal button
    Then the displayed result should be 12
    And the user closes the Calculator

  Scenario: Subtraction of two numbers
    Given the user opens the Calculator application
    When the user enters the number 9
    And the user presses the subtraction button
    And the user enters the number 3
    And the user presses the equal button
    Then the displayed result should be 6
    And the user closes the Calculator

  Scenario: Multiplication of two numbers
    Given the user opens the Calculator application
    When the user enters the number 8
    And the user presses the multiplication button
    And the user enters the number 4
    And the user presses the equal button
    Then the displayed result should be 32
    And the user closes the Calculator

  Scenario: Multiplication of two numbers (duplicate)
    Given the user opens the Calculator application
    When the user enters the number 8
    And the user presses the multiplication button
    And the user enters the number 4
    And the user presses the equal button
    Then the displayed result should be 32
    And the user closes the Calculator
