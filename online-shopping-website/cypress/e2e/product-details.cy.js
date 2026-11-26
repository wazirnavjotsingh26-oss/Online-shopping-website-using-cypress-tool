
describe('ShopEasy - Product Details Module', () => {

  beforeEach(() => {
    cy.visit('/products.html');
  });

  // TC61
  it('TC61 - should display first product details button', () => {
    cy.get('#view-details-1').should('be.visible');
  });

  // TC62
  it('TC62 - should open Nike product details', () => {
    cy.get('#view-details-1').click();
    cy.get('#product-dialog').should('be.visible');
  });

  // TC63
  it('TC63 - should display Nike product name', () => {
    cy.get('#view-details-1').click();
    cy.get('#dialog-product-name').should('contain', 'Nike Running Shoes');
  });

  // TC64
  it('TC64 - should close product details dialog', () => {
    cy.get('#view-details-1').click();
    cy.get('#close-product-dialog').click();
    cy.get('#product-dialog').should('not.be.visible');
  });

  // TC65
  it('TC65 - should open Casual T-Shirt details', () => {
    cy.get('#view-details-2').click();
    cy.get('#dialog-product-name').should('contain', 'Casual T-Shirt');
  });

  // TC66
  it('TC66 - should open Smart Watch details', () => {
    cy.get('#view-details-3').click();
    cy.get('#dialog-product-name').should('contain', 'Smart Watch');
  });

  // TC67
  it('TC67 - should open Laptop Backpack details', () => {
    cy.get('#view-details-4').click();
    cy.get('#dialog-product-name').should('contain', 'Laptop Backpack');
  });

  // TC68
  it('TC68 - should open Wireless Headphones details', () => {
    cy.get('#view-details-5').click();
    cy.get('#dialog-product-name').should('contain', 'Wireless Headphones');
  });

  // TC69
  it('TC69 - should display Add to Cart button in dialog', () => {
    cy.get('#view-details-1').click();
    cy.get('#dialog-add-to-cart').should('be.visible');
  });

  // TC70
  it('TC70 - should add product to cart from dialog', () => {
    cy.get('#view-details-1').click();
    cy.get('#dialog-add-to-cart').click();
    cy.get('#cart-count').should('contain', '1');
  });

});
