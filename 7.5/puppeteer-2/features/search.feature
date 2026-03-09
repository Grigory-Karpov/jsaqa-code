Feature: Ticket booking at QAMid cinema

  Scenario: User successfully books a ticket
    Given user is on cinema page
    When user chooses tomorrow and movie time
    And user chooses a free seat
    And user clicks Book button
    Then user sees the booking confirmation

  Scenario: User tries to book without choosing a seat
    Given user is on cinema page
    When user chooses tomorrow and movie time
    Then Book button is disabled