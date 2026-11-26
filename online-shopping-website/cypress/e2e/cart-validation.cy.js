
describe('ShopEasy - Cart Validation Module', () => {

  beforeEach(() => {
    cy.clearLocalStorage('shopeasy-cart');
    cy.visit('/products.html');
    cy.get('#add-to-cart-1').click();
    cy.wait(1500);
    cy.visit('/cart.html');
    cy.wait(1500);
  });

  // TC91
  it('TC91 - should display cart items section', () => {
    cy.get('#cart-items').should('be.visible');
  });

  // TC92
  it('TC92 - should display added product name', () => {
    cy.get('#cart-items').should('contain', 'Nike Running Shoes');
  });

  // TC93
  it('TC93 - should display quantity controls', () => {
    cy.get('.increase-quantity').should('be.visible');
    cy.get('.decrease-quantity').should('be.visible');
  });

  // TC94
  it('TC94 - should increase quantity to two', () => {
    cy.get('.increase-quantity').click();
    cy.wait(1500);
    cy.get('.quantity-value').should('contain', '2');
  });

  // TC95
  it('TC95 - should decrease quantity to one', () => {
    cy.get('.increase-quantity').click();
    cy.wait(1500);
    cy.get('.decrease-quantity').click();
    cy.wait(1500);
    cy.get('.quantity-value').should('contain', '1');
  });

// TC96
it('TC96 - should remove product when quantity reaches zero', () => {
  cy.get('.decrease-quantity').click();
  cy.wait(1500);

  cy.get('#cart-items')
    .should('not.contain', 'Nike Running Shoes');
});

  // TC97
  it('TC97 - should display remove button', () => {
    cy.get('.remove-item').should('be.visible');
  });

  // TC98
  it('TC98 - should remove product from cart', () => {
    cy.get('.remove-item').click();
    cy.wait(1500);
    cy.get('#cart-items').should('not.contain', 'Nike Running Shoes');
  });

  // TC99
  it('TC99 - should display cart subtotal', () => {
    cy.get('#cart-subtotal').should('be.visible');
  });

  // TC100
  it('TC100 - should display cart total', () => {
    cy.get('#cart-total').should('be.visible');
  });

});
