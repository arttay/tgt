// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
const BASE_URL = "localhost:3000/"

Cypress.Commands.add("fullSelection", () => { 
    cy.visit(BASE_URL)

    // Select Route
    cy.get("#tgt-route-select").click()
    cy.get(".tgt-route-2").click()


    // Select Direction
    cy.get("#tgt-direction-select").click()
    cy.get(".tgt-direction-0").click()

    // Select a stop
    cy.get("#tgt-stop-select").click()
    cy.get(".tgt-stop-FRHI").click()
 })
