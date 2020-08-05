/// <reference types="cypress" />
import { search } from "../../support/util";

context('Table', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })



    it('The table will be sorted by default by first name', () => {
        
        search('all')
            .get('.test-firstName-value')
            .then($firstNames => {
                const firstNames = $firstNames.toArray().map(fName => fName.innerText)
                const sortedFirstNames = [...firstNames].sort((a, b) => a < b ? -1 : 1)
                firstNames.forEach((e, index) => {
                    expect(firstNames[index]).to.equal(sortedFirstNames[index])
                });
            })
    })


    it('The table should be enabled to sort the table by first name, last name and country', () => {
        const sortableColumnNames = ['firstName', 'lastName', 'country']
        
        // cy.get('.test-input').type('all')
        //     .get('.test-button').click()
        //     .wait(10000)
        search('all')
            sortableColumnNames.forEach(columnName => {
            // Click on other button in order to init the sort order
            cy.get(`.test-sort-by-${sortableColumnNames.find(c => c !== columnName)}`).click()
                .get(`.test-sort-by-${columnName}`).click()
                .get(`.test-${columnName}-value`)
                .then($columnValues => testSort($columnValues, 1))
                .get(`.test-sort-by-${columnName}`).click()
                .then($columnValues => testSort($columnValues, -1))
                })
        })
})

function testSort($columnValues, orderFactor) {
    const firstNames = $columnValues.toArray().map(fName => fName.innerText)
    const sortedFirstNames = [...firstNames].sort((a, b) => a < b ? -orderFactor : orderFactor)
    firstNames.forEach((e, index) => {
        expect(firstNames[index]).to.equal(sortedFirstNames[index])
    });
}