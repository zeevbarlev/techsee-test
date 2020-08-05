/// <reference types="cypress" />
import { search } from "../../support/util";
import { MAX_VALID_LENGTH_NAME } from "../../../src/components/Search/Search";

context('Results', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('search all testers work', () => {
    // cy.get('.test-input').type('all')
    //   .get('.test-button').click()
    //   .wait(10000)
    search('all')
      .get('.test-table tr').should('have.length.gt', 0)
  })

  it('search name work', () => {

    // cy.get('.test-input').type('all')
    //   .get('.test-button').click()
    //   .wait(10000)
    search('all')
      .get('.test-firstName-value').first()
      .then($firstName => {
        const firstName = $firstName.text()
        search(firstName)
        // cy.get('.test-input').clear().type(firstName)
        //   .get('.test-button').click()
        //   .wait(10000)
          .get('.test-table tbody tr').should('have.length', 1)
      })
  })


  it('search name that doesnt exists work', () => {

    const generateName = () => {

      let generatedName = ''
      for (let index = 0; index < MAX_VALID_LENGTH_NAME; index++) {
        generatedName += String.fromCharCode(parseInt(Math.random() * 10) + 'a'.charCodeAt(0))
      }
      
      return generatedName
    }

    search('all')
            .get('.test-firstName-value')
            .then($firstNames => {
                const firstNames = $firstNames.toArray().map(fName => fName.innerText)
                let generatedName = generateName()
                while (firstNames.includes(generatedName)) {
                  generatedName = generateName()
                }
                search(generatedName)
              .get('.test-table tr').should('have.length', 0)
            })

    // cy.get('.test-input').type('wretwer')
    //   .get('.test-button').click()
    //   .wait(10000)
  })


  it('when the input is invalid should show error message', () => {
    // cy.get('.test-input').type('we/eqew')
    //   .get('.test-button').click()
    //   .wait(10000)
    search('we/eqew')
      .get('.test-error-query').should('have.text', 'Temporary error occurred, please try again later')
  })


})
