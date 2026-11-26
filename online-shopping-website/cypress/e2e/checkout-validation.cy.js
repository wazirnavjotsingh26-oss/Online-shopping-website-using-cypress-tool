
describe('ShopEasy - Checkout Form Validation', () => {

  beforeEach(() => {
    cy.clearLocalStorage('shopeasy-cart');
    cy.visit('/products.html');
    cy.get('#add-to-cart-1').click();
    cy.wait(1500);
    cy.visit('/checkout.html');
    cy.wait(1500);
  });

  // TC81
  it('TC81 - should check full name field is required', () => {
    cy.get('#full-name').should('have.attr', 'required');
  });

  // TC82
  it('TC82 - should check email field is required', () => {
    cy.get('#checkout-email').should('have.attr', 'required');
  });

  // TC83
  it('TC83 - should check phone field is required', () => {
    cy.get('#phone').should('have.attr', 'required');
  });

  // TC84
  it('TC84 - should check address field is required', () => {
    cy.get('#address').should('have.attr', 'required');
  });

  // TC85
  it('TC85 - should check city field is required', () => {
    cy.get('#city').should('have.attr', 'required');
  });

  // TC86
  it('TC86 - should check state field is required', () => {
    cy.get('#state').should('have.attr', 'required');
  });

  // TC87
  it('TC87 - should check PIN code field is required', () => {
    cy.get('#pin-code').should('have.attr', 'required');
  });

  // TC88
  it('TC88 - should reject invalid email format', () => {
    cy.get('#checkout-email').type('invalidemail', { delay: 150 });
    cy.wait(1500);

    cy.get('#checkout-email').then(($input) => {
      expect($input[0].checkValidity()).to.equal(false);
    });
  });

  // TC89
  it('TC89 - should reject an invalid phone number', () => {
    cy.get('#full-name').type('Test User', { delay: 150 });
    cy.get('#checkout-email').type('test@gmail.com', { delay: 150 });
    cy.get('#phone').type('12345', { delay: 150 });
    cy.get('#address').type('Chandigarh University', { delay: 150 });
    cy.get('#city').type('Mohali', { delay: 150 });
    cy.get('#state').type('Punjab', { delay: 150 });
    cy.get('#pin-code').type('140413', { delay: 150 });

    cy.get('#payment-method').select('Cash on Delivery');
    cy.wait(1500);

    cy.get('#place-order-btn').click();
    cy.wait(1500);

    cy.get('#order-success').should('not.be.visible');
  });

  // TC90
  it('TC90 - should reject an invalid PIN code', () => {
    cy.get('#full-name').type('Test User', { delay: 150 });
    cy.get('#checkout-email').type('test@gmail.com', { delay: 150 });
    cy.get('#phone').type('9876543210', { delay: 150 });
    cy.get('#address').type('Chandigarh University', { delay: 150 });
    cy.get('#city').type('Mohali', { delay: 150 });
    cy.get('#state').type('Punjab', { delay: 150 });

    cy.get('#pin-code').type('12345', { delay: 150 });

    cy.get('#payment-method').select('Cash on Delivery');
    cy.wait(1500);

    cy.get('#pin-code').then(($input) => {
      expect($input[0].checkValidity()).to.equal(false);
    });

    cy.get('#place-order-btn').click();
    cy.wait(1500);

    cy.get('#order-success').should('not.be.visible');
  });

});
