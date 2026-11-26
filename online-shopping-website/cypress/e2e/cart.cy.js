
describe('ShopEasy - Shopping Cart Module', () => {

  beforeEach(() => {
  cy.clearLocalStorage('shopeasy-cart');
  cy.visit('/products.html');
  cy.get('#add-to-cart-1').click();
  cy.wait(1500);
  cy.visit('/cart.html');
  cy.wait(1500);
});

  // TC11
  it('TC11 - should display cart items', () => {
    cy.get('#cart-items').should('contain', 'Nike Running Shoes');
  });

  // TC12
  it('TC12 - should display cart subtotal', () => {
    cy.get('#cart-subtotal').should('be.visible');
  });

  // TC13
  it('TC13 - should display cart total', () => {
    cy.get('#cart-total').should('be.visible');
  });

  // TC14
  it('TC14 - should display quantity as one', () => {
    cy.get('.quantity-value').should('contain', '1');
  });

  // TC15
  it('TC15 - should increase product quantity', () => {
  cy.get('.increase-quantity').click();
  cy.wait(1500);
  cy.get('.quantity-value').should('contain', '2');
});
  // TC16
 it('TC16 - should decrease product quantity', () => {
  cy.get('.increase-quantity').click();
  cy.wait(1500);
  cy.get('.decrease-quantity').click();
  cy.wait(1500);
  cy.get('.quantity-value').should('contain', '1');
});

  // TC17
  it('TC17 - should remove product from cart', () => {
  cy.get('.remove-item').click();
  cy.wait(1500);
  cy.get('#cart-items').should('not.contain', 'Nike Running Shoes');
});

  // TC18
  it('TC18 - should display checkout button', () => {
    cy.get('#checkout-btn').should('be.visible');
  });

  // TC19
  it('TC19 - should display continue shopping link', () => {
    cy.contains('Continue shopping').should('be.visible');
  });

  // TC20
  it('TC20 - should navigate to checkout page', () => {
  cy.get('#checkout-btn').click();
  cy.wait(1500);
  cy.url().should('include', 'checkout.html');
});

});
