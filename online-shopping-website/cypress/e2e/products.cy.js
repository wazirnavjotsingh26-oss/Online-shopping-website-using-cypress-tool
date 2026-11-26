
describe('ShopEasy - Products Module', () => {

  beforeEach(() => {
    cy.visit('/products.html');
    cy.clearLocalStorage('shopeasy-cart');
    cy.reload();
  });

  // TC01: Verify products page heading
  it('TC01 - should display products heading', () => {
    cy.get('#products-heading').should('be.visible');
  });

  // TC02: Verify first product
  it('TC02 - should display Nike Running Shoes', () => {
    cy.get('#product-1').should('contain', 'Nike Running Shoes');
  });

  // TC03: Verify second product
  it('TC03 - should display Casual T-Shirt', () => {
    cy.get('#product-2').should('contain', 'Casual T-Shirt');
  });

  // TC04: Verify all eight products
  it('TC04 - should display all eight products', () => {
    for (let i = 1; i <= 8; i++) {
      cy.get(`#product-${i}`).should('be.visible');
    }
  });

  // TC05: Verify product search box
  it('TC05 - should display the search box', () => {
    cy.get('#product-search').should('be.visible');
  });

  // TC06: Verify product price
  it('TC06 - should display product price', () => {
    cy.get('#product-1').should('contain', '2,999');
  });

  // TC07: Verify product image
  it('TC07 - should display product image', () => {
    cy.get('#product-1 img').should('be.visible');
  });

  // TC08: Verify Add to Cart button
  it('TC08 - should display Add to Cart button', () => {
    cy.get('#add-to-cart-1').should('be.visible');
  });

  // TC09: Verify cart count after adding product
  it('TC09 - should increase cart count after adding product', () => {
    cy.get('#add-to-cart-1').click();
    cy.get('#cart-count').should('contain', '1');
  });

  // TC10: Verify View Details button
  it('TC10 - should open product details', () => {
    cy.get('#view-details-1').click();
    cy.get('#product-dialog').should('be.visible');
  });

});
