Feature: Calculator Operations
  As a user, I want to perform basic arithmetic operations
  so that I can get correct results.

  Scenario: Add two numbers
    Given the user opens the Calculator application
    When the user enters the number 7
    And the user presses the addition button
    And the user enters the number 5
    And the user presses the equals button
    Then the displayed result should be 12
    And the user closes the Calculator

  Scenario: Subtract two numbers
    Given the user opens the Calculator application
    When the user enters the number 9
    And the user presses the subtraction button
    And the user enters the number 3
    And the user presses the equals button
    Then the displayed result should be 6
    And the user closes the Calculator

  Scenario: Multiply two numbers
    Given the user opens the Calculator application
    When the user enters the number 8
    And the user presses the multiplication button
    And the user enters the number 4
    And the user presses the equals button
    Then the displayed result should be 32
    And the user closes the Calculator

  Scenario: Divide two numbers
    Given the user opens the Calculator application
    When the user enters the number 10
    And the user presses the division button
    And the user enters the number 2
    And the user presses the equals button
    Then the displayed result should be 5
    And the user closes the Calculator
