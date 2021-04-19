describe('Search by Stop', () => {
    const BASE_URL = "localhost:3000/"
  
    it("Basic search by Stop", () => {
        const searchStopNumber = 74
        cy.visit(BASE_URL)
        cy.intercept('GET', `https://svc.metrotransit.org/nextripv2/${searchStopNumber}`).as('getStopNumber')

        cy.get('[data-cy=byStop]').click()

        cy.get('[data-cy=stopNumberInput]').type(searchStopNumber).type("{enter}")

        cy.wait("@getStopNumber")

        cy.url().then(url => {
            expect(url).to.equal(`http://${BASE_URL}${searchStopNumber}`)
            cy.get('[data-cy=searchListing]').should("exist")

        });


    })
    
    it("Basic search by Stop", () => {
        const searchStopNumber = "dgh"
        cy.visit(BASE_URL)
        cy.intercept('GET', `https://svc.metrotransit.org/nextripv2/${searchStopNumber}`).as('getStopNumber')

        cy.get('[data-cy=byStop]').click()

        cy.get('[data-cy=stopNumberInput]').type(searchStopNumber).type("{enter}")

        cy.wait("@getStopNumber")

        cy.url().then(url => {
            expect(url).to.equal(`http://${BASE_URL}`)
            cy.get('[data-cy=searchListing]').should("not.exist")
            cy.get('[data-cy=errorState]').should("exist")
        });
    })
 
  
   
})