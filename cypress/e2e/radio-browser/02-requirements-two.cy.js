/// <reference types="cypress" />

describe('Radio Browser Challenge App - Search Filter', () => {
  // see https://github.com/hugoleonardodev/hugo-radio-browser?tab=readme-ov-file#obrigat%C3%B3rios

  beforeEach(() => {
    cy.visit('https://frontend-radio-browser-hugo-leonardo.vercel.app')
  })

  it('should be able to seach by radio name filter', () => {
    // cy.get('.todo-list li').should('have.length', 2)

    cy.wait(30000)
  })

  it('should be able to seach by radio language filter', () => {
    // cy.get('.todo-list li').should('have.length', 2)

    cy.wait(30000)
  })

  it('should be able to seach by radio country filter', () => {
    // cy.get('.todo-list li').should('have.length', 2)

    cy.wait(30000)
  })
})
