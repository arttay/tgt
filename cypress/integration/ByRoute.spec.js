describe('Search by Route', () => {
  const BASE_URL = "localhost:3000/"

  
    it('Basic full route selection', () => {
      cy.server()
      cy.route('GET', '/nextripv2/2/0/FRHI').as('getStopTimes')
      cy.fullSelection()
     
      // Wait for search results to come back. Eliminates race condition of adding to url and DOM elements appearing 
      cy.wait('@getStopTimes')

      cy.url().then(url => {
        cy.get("#tgt-search-listings").should("exist")
        expect(url).to.equal(`http://${BASE_URL}2/0/FRHI`)
      });
    })
  
    it('Change Direction after full selection', () => {
      cy.server()
      cy.route('GET', '/nextripv2/2/0/FRHI').as('getStopTimes')
      cy.fullSelection()
     
      // Select a new Direction
      cy.get("#tgt-direction-select").click()
      cy.get(".tgt-direction-1").click()

      cy.get("#tgt-search-listings").should("not.exist")
      cy.get("#tgt-stop-select").contains("Select a Stop")
        cy.url().then(url => {
          expect(url).to.equal(`http://${BASE_URL}2/1`)
        });
    })
 

  it('Change Route after full selection', () => {
    cy.server()
    cy.route('GET', '/nextripv2/2/0/FRHI').as('getStopTimes')
    cy.fullSelection()
  
    // Select a new Direction
    cy.get("#tgt-route-select").click()
    cy.get(".tgt-route-6").click()

    cy.get("#tgt-search-listings").should("not.exist")
    cy.get("#tgt-stop-select").should("not.exist")
    cy.get("#tgt-direction-select").contains("Select a Direction")

      cy.url().then(url => {
        expect(url).to.equal(`http://${BASE_URL}6`)
      });
  })

  it("The back button test", () => {
    cy.server()
    cy.fullSelection()

    cy.go('back')
    cy.go('back')

    cy.url().then(url => {
      expect(url).to.equal(`http://${BASE_URL}2`)
      cy.get("#tgt-stop-select").contains("Select a Stop")
      cy.get("#tgt-direction-select").contains("Select a Direction")
    });

  })

 it("Change search type", () => {
  cy.server()
  cy.fullSelection()

  cy.get("#tgt-search-stop-btn").click()
  cy.get("#tgt-search-route-btn").click()

  cy.get("#tgt-stop-select").should("exist")
  cy.get("#tgt-direction-select").should("exist")
  cy.get("#tgt-route-select").should("exist")
 })



  })