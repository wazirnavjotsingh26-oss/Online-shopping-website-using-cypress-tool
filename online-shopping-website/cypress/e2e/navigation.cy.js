
describe('ShopEasy Navigation Tests', () => {

  it('TC41 - should open homepage', () => {
    cy.visit('/');
    cy.title().should('not.be.empty');
  });

  it('TC42 - should open products page', () => {
    cy.visit('/products.html');
    cy.get('#products-heading').should('be.visible');
  });

  it('TC43 - should open cart page', () => {
    cy.visit('/cart.html');
    cy.get('#cart-items').should('be.visible');
  });

  it('TC44 - should open login page', () => {
    cy.visit('/login.html');
    cy.get('#login-form').should('be.visible');
  });

  it('TC45 - should open checkout page', () => {
    cy.visit('/checkout.html');
    cy.get('#checkout-form').should('be.visible');
  });

  it('TC46 - should display products page title', () => {
    cy.visit('/products.html');
    cy.title().should('include', 'ShopEasy');
  });

  it('TC47 - should display cart page title', () => {
    cy.visit('/cart.html');
    cy.title().should('include', 'ShopEasy');
  });

  it('TC48 - should display login page title', () => {
    cy.visit('/login.html');
    cy.title().should('include', 'Login');
  });

  it('TC49 - should display checkout page title', () => {
    cy.visit('/checkout.html');
    cy.title().should('include', 'Checkout');
  });

  it('TC50 - should navigate from products to cart', () => {
    cy.visit('/products.html');
    cy.get('#cart-link').click();
    cy.url().should('include', 'cart.html');
  });

});
