/// <reference types="cypress" />

beforeEach('Open application', () => {
    cy.visit('/') // for now no specific page as we go to diffrent ones 
})



//
// Dialog Boxes
//
it.only('dialog boxes', () => {
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    //1. To test a confirmed window in popup window 
    // cy.get('.nb-trash').first().click()
    //     // method .on will listen on diffrent events triggered by the browser. 
    // cy.on('window:confirm', confirm => {
    //     expect(confirm).to.equal('Are you sure you want to delete?')
    // })

    // 2. Prefer to use , with .window method to open it 
    cy.window().then(win => {
        cy.stub(win, 'confirm').as('dialogBox').returns(true)
    })
    cy.get('.nb-trash').first().click()
    cy.get('@dialogBox').should('be.calledWith', 'Are you sure you want to delete?')

})



//
// Web Tables (part 1)
//

it.only('Web Tables', () => {
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    // 1. Find a row that has a inuque value by indentifiers (text) - use .contains and .wrap
    cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
        cy.wrap(tableRow).find('.nb-edit').click()
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('35')
        cy.wrap(tableRow).find('.nb-checkmark').click()
        cy.wrap(tableRow).find('td').last().should('have.text', '35')
    })

    // 2. Find by index by uniqe IDs or text
    cy.get('.nb-plus').click()
    cy.get('thead tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('John')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Smith')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        // Confiming that row with this name was created
    cy.get('tbody tr').first().find('td').then(tableColumns => {
        cy.wrap(tableColumns).eq(2).should('have.text', 'John')
        cy.wrap(tableColumns).eq(3).should('have.text', 'Smith')
    })


    // 3. Validating every row in the table with some particular value 
    // Looping trough the rows

    // adding arrays to test 

    const ages = [20, 30, 40, 200]

    cy.wrap(ages).each(age => {
        cy.get('[placeholder="Age"]').clear().type(age)
            // need to put delay for 0.5 a second to typed value will be saved (only as we not using real APi)
        cy.wait(500) // better not to use in noraml scenario

        cy.get('tbody tr').each(tableRows => {
            if (age == 200) {
                cy.wrap(tableRows).should('contain.text', 'No data found')
            } else {
                cy.wrap(tableRows).find('td').last().should('have.text', age)
            }
        })

    })



})
