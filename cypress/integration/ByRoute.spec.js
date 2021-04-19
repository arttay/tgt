describe('Search by Route', () => {
  const BASE_URL = "localhost:3000/"

    it('Basic full route selection', () => {
      const path = "901/0/MAAM"
      cy.intercept('GET', `https://svc.metrotransit.org/nextripv2/${path}`).as('getStopTimes')
      cy.fullSelection()
     
      // Wait for search results to come back. Eliminates race condition of adding to url and DOM elements appearing 
      cy.wait('@getStopTimes')

      cy.url().then(url => {
        cy.get('[data-cy=searchListing]').should("exist")
        expect(url).to.equal(`http://${BASE_URL}${path}`)
      });
    })
  
    it('Change Direction after full selection', () => {
      const path = "901/0/MAAM"
      cy.intercept('GET', `https://svc.metrotransit.org/nextripv2/${path}`).as('getStopTimes')
      cy.fullSelection()
     
      // Select a new Direction
      cy.get('[data-cy=directionSelect]').click()
      cy.get('[data-cy=direction-1]').click()

      cy.wait("@getStopTimes")

      cy.get('[data-cy=searchListing]').should("not.exist")
      cy.get('[data-cy=stopSelect]').contains("Select a Stop")
        cy.url().then(url => {
          expect(url).to.equal(`http://${BASE_URL}901/1`)
        });
    })
 

  it('Change Route after full selection', () => {
    const path = "901/0/MAAM"
    cy.intercept('GET', `https://svc.metrotransit.org/nextripv2/${path}`).as('getStopTimes')
    cy.fullSelection()
  
    // Select a new Direction
    cy.get('[data-cy=routeSelect]').click()
    cy.get('[data-cy=route-6]').click()
  
    cy.wait("@getStopTimes")
    
    cy.get('[data-cy=searchListing]').should("not.exist")
    cy.get('[data-cy=stopSelect]').should("not.exist")
    cy.get('[data-cy=directionSelect]').contains("Select a Direction")
      cy.url().then(url => {
        expect(url).to.equal(`http://${BASE_URL}2`)
      });
  })

  it("The back button test", () => {
    cy.fullSelection()

    cy.go('back')
    cy.go('back')

    cy.url().then(url => {
      expect(url).to.equal(`http://${BASE_URL}901`)
      cy.get('[data-cy=stopSelect]').contains("Select a Stop")
      cy.get('[data-cy=directionSelect]').contains("Select a Direction")
    });

  })

 it("Change search type", () => {
  cy.fullSelection()

  cy.get('[data-cy=byStop]').click()
  cy.get('[data-cy=byRoute]').click()


  cy.get('[data-cy=stopSelect]').should("exist")
  cy.get('[data-cy=directionSelect]').should("exist")
  cy.get('[data-cy=routeSelect]').should("exist")
 })
 



  })