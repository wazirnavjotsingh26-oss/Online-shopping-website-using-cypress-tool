
describe('ShopEasy - Checkout Module', () => {

  beforeEach(() => {
    cy.clearLocalStorage('shopeasy-cart');
    cy.visit('/products.html');
   cy.get('#add-to-cart-1').click();
cy.wait(1500);
cy.visit('/checkout.html');
  });

  // TC31
  it('TC31 - should display checkout form', () => {
    cy.get('#checkout-form').should('be.visible');
  });

  // TC32
  it('TC32 - should display full name field', () => {
    cy.get('#full-name').should('be.visible');
  });

  // TC33
  it('TC33 - should display email field', () => {
    cy.get('#checkout-email').should('be.visible');
  });

  // TC34
  it('TC34 - should display phone field', () => {
    cy.get('#phone').should('be.visible');
  });

  // TC35
  it('TC35 - should display address field', () => {
    cy.get('#address').should('be.visible');
  });

  // TC36
  it('TC36 - should display city and state fields', () => {
    cy.get('#city').should('be.visible');
    cy.get('#state').should('be.visible');
  });

  // TC37
  it('TC37 - should display PIN code field', () => {
    cy.get('#pin-code').should('be.visible');
  });

  // TC38
  it('TC38 - should display payment method options', () => {
    cy.get('#payment-method').should('be.visible');
  });

  // TC39
  it('TC39 - should display checkout total', () => {
    cy.get('#checkout-total').should('be.visible');
  });

  // TC40
  it('TC40 - should display Place Order button', () => {
    cy.get('#place-order-btn').should('be.visible');
  });

});
