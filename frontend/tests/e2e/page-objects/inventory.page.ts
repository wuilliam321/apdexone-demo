export class ProductsPage {}

export class InventoryPage {
  private _url: string;
  private _productsLink: Cypress.Chainable<JQuery<HTMLElement>>;

  constructor() {
    this._url = "http://localhost:8080/inventory";
    this._productsLink = cy.findByRole("link", { name: "Products" });
  }

  visit(): InventoryPage {
    cy.visit(this._url);
    return this;
  }

  goToProductsPage(): ProductsPage {
    this._productsLink.click();
    return new ProductsPage();
  }
}
