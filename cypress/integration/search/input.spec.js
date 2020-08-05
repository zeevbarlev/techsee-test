/// <reference types="cypress" />

import { MAX_VALID_LENGTH_NAME, MIN_VALID_LENGTH_NAME } from "../../../src/components/Search/Search";

context('Actions', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })
  
    it('search input work', () => {
      cy.get('.test-input')
        .type('all').should('have.value', 'all')
    })

    it(`search input less than ${MIN_VALID_LENGTH_NAME} show error`, () => {
        cy.get('.test-input')
          .type('a')
          .blur()
          .get('.test-helper-text')
          .should('have.text', `name must be greater than ${MIN_VALID_LENGTH_NAME} characters`)
      })

      it(`search input greater than ${MAX_VALID_LENGTH_NAME} show error`, () => {
        cy.get('.test-input')
          .type('1234567890123')
          .blur()
          .get('.test-helper-text')
          .should('have.text', `name must be less than ${MAX_VALID_LENGTH_NAME} characters`)
      })

      it(`only search input greater than ${MAX_VALID_LENGTH_NAME} show error or less than ${MIN_VALID_LENGTH_NAME} show error`, () => {
        cy.get('.test-input')
          .type('a'.repeat(MIN_VALID_LENGTH_NAME + 1))
          .blur()
          .get('.test-helper-text').should('not.exist')
      })
  })
  