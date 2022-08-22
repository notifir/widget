/// <reference types="cypress" />

describe('notification-bell', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should check if notification-bell exists', () => {
    cy
      .get('notification-bell')
      .shadow()
      .find('div.bell')
      .should('exist')
  })

  it('should open / close notifications box by clicking on bell', () => {
    cy
      .get('notification-bell')
      .shadow()
      .find('div.bell')
      .click()

    cy
      .get('notification-bell')
      .shadow()
      .find('div.container')
      .should('not.have.css', 'display', 'none')

    cy
      .get('notification-bell')
      .shadow()
      .find('div.bell')
      .click()

    cy
      .get('notification-bell')
      .shadow()
      .find('div.container')
      .should('have.css', 'display', 'none')
  })

  it('should close notifications box by clicking outside the notifications box', () => {
    cy
      .get('notification-bell')
      .shadow()
      .find('div.bell')
      .click()

    cy
      .get('notification-bell')
      .shadow()
      .find('div.container')
      .should('not.have.css', 'display', 'none')

    cy
      .get('notification-bell')
      .parent()
      .click(0, 0)

    cy.get('notification-bell')
      .shadow()
      .find('div.container')
      .should('have.css', 'display', 'none')
  })

  it('should check unread count', () => {
    cy
      .get('notification-bell')
      .shadow()
      .find('div.items-list > div.item > div.item-unread')
      .its('length').should('eq', 6)

    cy
      .get('notification-bell')
      .shadow()
      .find('div.bell > div.bell-counter')
      .then((node) => {
        expect(node.text()).to.equal('6')
      })
  })

  it('should redirect by clicking on notification', () => {
    cy
      .get('notification-bell')
      .shadow()
      .find('div.bell')
      .click()

    cy
      .get('notification-bell')
      .shadow()
      .find('div.items-list > div.item')
      .last()
      .click()

    cy
      .url()
      .should('eq', 'https://notifir.github.io/widget/')
  })

  it('should mark first notification as read', () => {
    cy
      .get('notification-bell')
      .shadow()
      .find('div.bell')
      .click()

    cy
      .get('notification-bell')
      .shadow()
      .find('div.items-list > div.item')
      .first()
      .click()

    cy
      .get('notification-bell')
      .shadow()
      .find('div.bell > div.bell-counter')
      .then((node) => {
        expect(node.text()).to.equal('5')
      })

    cy
      .get('notification-bell')
      .shadow()
      .find('div.items-list > div.item')
      .each((item, index) => {
        cy.wrap(item).find('div.item-unread').should(index === 0 ? 'not.exist' : 'exist')
      })
  })

  it('should mark all notifications as read', () => {
    cy
      .get('notification-bell')
      .shadow()
      .find('div.bell')
      .click()

    cy
      .get('notification-bell')
      .shadow()
      .find('div.header > span.header-link')
      .click()

    cy
      .get('notification-bell')
      .shadow()
      .find('div.bell > div.bell-counter')
      .should('not.exist')

    cy
      .get('notification-bell')
      .shadow()
      .find('div.items-list > div.item')
      .each((item) => {
        cy.wrap(item).find('div.item-unread').should('not.exist')
      })
  })
})
