
export function search(query){
    return cy.get('.test-input').clear().type(query)
        .get('.test-button').click()
        .wait(10000)
}