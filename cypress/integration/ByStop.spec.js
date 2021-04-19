describe('Search by Stop', () => {
    const BASE_URL = "localhost:3000/"
  
    it("Basic search by Stop", () => {
        const searchStopNumber = 74
        cy.server()
        cy.visit(BASE_URL)
        cy.intercept('GET', `https://svc.metrotransit.org/nextripv2/${searchStopNumber}`).as('getStopNumber')

        cy.get("#tgt-search-stop-btn").click()

        cy.get("#tgt-stop-search-input").type(searchStopNumber).type("{enter}")

        cy.wait("@getStopNumber")

        cy.url().then(url => {
            expect(url).to.equal(`http://${BASE_URL}${searchStopNumber}`)
            cy.get("#tgt-search-listings").should("exist")

        });


    })
    
    it("Basic search by Stop", () => {
        const searchStopNumber = "dgh"
        cy.server()
        cy.visit(BASE_URL)
        cy.intercept('GET', `https://svc.metrotransit.org/nextripv2/${searchStopNumber}`).as('getStopNumber')

        cy.get("#tgt-search-stop-btn").click()

        cy.get("#tgt-stop-search-input").type(searchStopNumber).type("{enter}")

        cy.wait("@getStopNumber")

        cy.url().then(url => {
            expect(url).to.equal(`http://${BASE_URL}`)
            cy.get("#tgt-search-listings").should("not.exist")
            cy.get("#tgt-search-error-state").should("exist")
        });
    })
 
  
   
})