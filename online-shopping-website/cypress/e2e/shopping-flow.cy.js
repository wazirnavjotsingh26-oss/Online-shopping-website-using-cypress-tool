
describe('ShopEasy - Complete Shopping Flow Module', () => {

  beforeEach(() => {
    cy.clearLocalStorage('shopeasy-cart');
    cy.visit('/products.html');
  });

  // TC71
  it('TC71 - should open products page', () => {
    cy.get('#products-heading').should('be.visible');
  });

  // TC72
it('TC72 - should add Nike shoes to cart', () => {
  cy.get('#add-to-cart-1').click();
  cy.wait(1500);
  cy.get('#cart-count').should('contain', '1');
});

// TC73
it('TC73 - should add two different products to cart', () => {
  cy.get('#add-to-cart-1').click();
  cy.wait(1500);
  cy.get('#add-to-cart-2').click();
  cy.wait(1500);
  cy.get('#cart-count').should('contain', '2');
});

// TC74
it('TC74 - should open cart after adding product', () => {
  cy.get('#add-to-cart-1').click();
  cy.wait(1500);
  cy.get('#cart-link').click();
  cy.wait(1500);
  cy.url().should('include', 'cart.html');
});

  // TC75
  it('TC75 - should display added product in cart', () => {
    cy.get('#add-to-cart-1').click();
    cy.visit('/cart.html');
    cy.get('#cart-items').should('contain', 'Nike Running Shoes');
  });

  // TC76
it('TC76 - should update quantity in cart', () => {
  cy.get('#add-to-cart-1').click();
  cy.visit('/cart.html');
  cy.get('.increase-quantity').click();
  cy.wait(1500);
  cy.get('.quantity-value').should('contain', '2');
});

// TC77
it('TC77 - should open checkout page', () => {
  cy.get('#add-to-cart-1').click();
  cy.visit('/cart.html');
  cy.get('#checkout-btn').click();
  cy.wait(1500);
  cy.url().should('include', 'checkout.html');
});

  // TC78
  it('TC78 - should display product total on checkout page', () => {
    cy.get('#add-to-cart-1').click();
    cy.visit('/checkout.html');
    cy.get('#checkout-total').should('be.visible');
  });

  // TC79
  it('TC79 - should fill checkout form', () => {
    cy.get('#add-to-cart-1').click();
    cy.visit('/checkout.html');

    cy.get('#full-name').type('Test User', { delay: 150 });
cy.get('#checkout-email').type('test@gmail.com', { delay: 150 });
cy.get('#phone').type('9876543210', { delay: 150 });
    cy.get('#address').type('Chandigarh University');
    cy.get('#city').type('Mohali');
    cy.get('#state').type('Punjab');
    cy.get('#pin-code').type('140413');

    cy.get('#full-name').should('have.value', 'Test User');
    cy.get('#checkout-email').should('have.value', 'test@gmail.com');
  });

  // TC80
  it('TC80 - should place order successfully', () => {
    cy.get('#add-to-cart-1').click();
    cy.wait(1500);
    cy.visit('/checkout.html');

    cy.get('#full-name').type('Test User', { delay: 150 });
cy.get('#checkout-email').type('test@gmail.com', { delay: 150 });
cy.get('#phone').type('9876543210', { delay: 150 });
    cy.get('#address').type('Chandigarh University');
    cy.get('#city').type('Mohali');
    cy.get('#state').type('Punjab');
    cy.get('#pin-code').type('140413');
    cy.get('#payment-method').select('Cash on Delivery');

    cy.get('#place-order-btn').click();

    cy.get('#order-success').should('be.visible');
    cy.get('#order-id').should('not.be.empty');
  });

});
