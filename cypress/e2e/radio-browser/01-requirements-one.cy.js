/// <reference types="cypress" />

describe('Radio Browser Challenge App', () => {
  // see https://github.com/hugoleonardodev/hugo-radio-browser?tab=readme-ov-file#obrigat%C3%B3rios

  beforeEach(() => {
    cy.visit('https://frontend-radio-browser-hugo-leonardo.vercel.app')
  })

  it('should be able to add a radio to favorites and check if it is in favorites', () => {
    cy.get('.grid > div > button').each(($button) => {
      cy.wrap($button).click();
    });

    cy.get('.bg-gray-200 > .flex-col > div').its('length').should('be.greaterThan', 9)
  })

  it('should be able to play/pause a radio in favorites', () => {
    cy.get('.grid > div > :nth-child(2)').click();
    cy.get(':nth-child(1) > .rounded-full').click()
    cy.get('audio').then(($audio) => {
      // Ensure the audio element is not paused
      cy.wrap($audio).should('not.have.prop', 'paused', true);
    });
    cy.get(':nth-child(1) > .rounded-full').click()
    cy.get('audio').then(($audio) => {
      // Ensure the audio element is not paused
      cy.wrap($audio).should('have.prop', 'paused', true);
    });
  })

  it('should be able to remove a radio from favorites', () => {
    cy.get('.grid > div > :nth-child(2)').click();
    cy.get('.text-gray-400 > .justify-between > :nth-child(2) > :nth-child(2)').click()
    cy.get('.border-transparent > .flex').click().wait(2000)
    cy.get('.bg-gray-200 > .flex-col > div').its('length').should('not.be.greaterThan', 1)

  })

  it('should be able to edit radio data that is in favorites', () => {
    // cy.get('.todo-list li').should('have.length', 2)


  })

  it('should be able to search for a radio', () => {
    // cy.get('.todo-list li').should('have.length', 2)


  })
})
