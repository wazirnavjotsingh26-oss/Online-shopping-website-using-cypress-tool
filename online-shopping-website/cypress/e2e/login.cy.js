
describe('ShopEasy - Login Module', () => {

  beforeEach(() => {
    cy.visit('/login.html');
  });

  // TC21
  it('TC21 - should display login page heading', () => {
    cy.contains('Login').should('be.visible');
  });

  // TC22
  it('TC22 - should display email field', () => {
    cy.get('#email').should('be.visible');
  });

  // TC23
  it('TC23 - should display password field', () => {
    cy.get('#password').should('be.visible');
  });

  // TC24
  it('TC24 - should display login button', () => {
    cy.get('#login-btn').should('be.visible');
  });

  // TC25
  it('TC25 - should display create account link', () => {
    cy.get('#create-account-link').should('be.visible');
  });

  // TC26
  it('TC26 - should login with valid credentials', () => {
    cy.get('#email').type('test@gmail.com');
    cy.get('#password').type('123456');
    cy.get('#login-btn').click();
    cy.get('#login-message').should('contain', 'Login successful');
  });

  // TC27
  it('TC27 - should reject invalid email', () => {
    cy.get('#email').type('wrong@gmail.com');
    cy.get('#password').type('123456');
    cy.get('#login-btn').click();
    cy.get('#login-message').should('contain', 'Invalid email or password');
  });

  // TC28
  it('TC28 - should reject invalid password', () => {
    cy.get('#email').type('test@gmail.com');
    cy.get('#password').type('wrong123');
    cy.get('#login-btn').click();
    cy.get('#login-message').should('contain', 'Invalid email or password');
  });

  // TC29
  it('TC29 - should reject empty login details', () => {
    cy.get('#login-btn').click();
    cy.get('#login-message').should('contain', 'Invalid email or password');
  });

  // TC30
  it('TC30 - should allow user to enter email and password', () => {
    cy.get('#email').type('test@gmail.com');
    cy.get('#password').type('123456');
    cy.get('#email').should('have.value', 'test@gmail.com');
    cy.get('#password').should('have.value', '123456');
  });

});
