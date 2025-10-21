# Cypress-Test-Dialog-Boxes-Web-Tables
This Cypress suite demonstrates advanced UI automation for browser dialog interactions and dynamic web table validation, showcasing Cypress capabilities beyond simple form tests.


# What this project covers

Dialog Boxes:
Simulates browser confirmation dialogs using:
cy.window().then(win => cy.stub(win, 'confirm'))

Listens for confirmation text:
.should('be.calledWith', 'Are you sure you want to delete?')

Demonstrates Cypress stubbing with .as() aliasing

Tests “Delete” actions inside the Smart Table component

Verifies conditional dialog responses using stubs and assertions


# Web Tables

Row Editing
Finds specific rows (e.g., by text "Larry") and updates the Age cell with assertions:

cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('35')
cy.wrap(tableRow).find('td').last().should('have.text', '35')

Row Creation
Adds a new record through header input fields and validates values:

cy.get('thead tr').eq(2)
cy.wrap(tableRow).find('[placeholder="First Name"]').type('John')
cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Smith')


Dynamic Validation with Loops
Iterates through table entries using cy.wrap(ages).each() to test multiple values:

const ages = [20, 30, 40, 200];
cy.wrap(ages).each(age => { ... });

Uses conditional logic to handle empty states (e.g., “No data found” message).


# Skills Practiced
Cypress window stubbing and event handling
Advanced DOM traversal using .contains(), .wrap(), and .find()
Assertion chaining with .should()
Dynamic testing with loops and conditional checks
Realistic simulation of CRUD actions in tables
