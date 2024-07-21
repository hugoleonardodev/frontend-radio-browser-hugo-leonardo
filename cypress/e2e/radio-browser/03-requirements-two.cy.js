/// <reference types="cypress" />

describe('Radio Browser Challenge App - Persisting user data', () => {
  // see https://github.com/hugoleonardodev/hugo-radio-browser?tab=readme-ov-file#obrigat%C3%B3rios

  beforeEach(() => {
    cy.visit('https://frontend-radio-browser-hugo-leonardo.vercel.app')
  })

  it('should be able to keep the data in the local storage', () => {
    // cy.get('.todo-list li').should('have.length', 2)

    // cy.wait(30000)
  })
})
