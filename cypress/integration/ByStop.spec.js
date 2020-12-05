describe('Search by Stop', () => {
    const BASE_URL = "localhost:3000/"
  
    
    it("Basic search by Stop", () => {
        cy.server()
        cy.visit(BASE_URL)

        cy.get("#tgt-search-stop-btn").click()

        cy.get("#tgt-stop-search-input").type(74).type("{enter}")

        // I dont like it either...gives times for code that adds to url to complete.
        // Waiting for http request was too fast =/
        cy.wait(20)

        cy.url().then(url => {
            expect(url).to.equal(`http://${BASE_URL}74`)
            cy.get("#tgt-search-listings").should("exist")

        });


    })
    
    it("Basic search by Stop", () => {
        cy.server()
        cy.visit(BASE_URL)

        cy.get("#tgt-search-stop-btn").click()

        cy.get("#tgt-stop-search-input").type("dgh").type("{enter}")

        // I dont like it either...gives times for code that adds to url to complete.
        // Waiting for http request was too fast =/
        cy.wait(20)

        cy.url().then(url => {
            expect(url).to.equal(`http://${BASE_URL}`)
            cy.get("#tgt-search-listings").should("not.exist")
            cy.get("#tgt-search-error-state").should("exist")
        });
    })
 
  
   
})