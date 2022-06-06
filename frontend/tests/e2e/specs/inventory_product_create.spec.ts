// import { InventoryPage } from "../page-objects/inventory.page";

// class ProductsPage {}

// function InventoryPage() {
//   const url = "http://localhost:8080/inventory";
//   const productsLink = cy.findByRole("link", { name: "Products" });
//   const inventoryLink = cy.findByRole("link", { name: "Inventory" });

//   const visit = (): void => {
//     cy.visit(url);
//   };

//   const goToProductsPage = (): ProductsPage => {
//     productsLink.click();
//     return new ProductsPage();
//   };

//   const goToInventoryPage = (): void => {
//     inventoryLink.click();
//     // return new ProductsPage();
//   };

//   return {
//     visit,
//     goToProductsPage,
//     goToInventoryPage,
//   };
// }
//
type TestProduct = {
  code: string;
  name: string;
  price: number;
};

function InventoryPage() {
  const visit = (): void => {
    cy.visit("http://localhost:8080/inventory");
  };

  const productsLink = (): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy.findByRole("link", { name: /products/i });
  };

  return {
    visit,
    productsLink,
  };
}

describe("My First Test", () => {
  const inventoryPage = InventoryPage();
  const products: TestProduct[] = [
    {
      code: "127",
      name: "Test Product",
      price: 100,
    },
    {
      code: "128",
      name: "Test Product",
      price: 100,
    },
    {
      code: "129",
      name: "Test Product",
      price: 100,
    },
    {
      code: "130",
      name: "Test Product",
      price: 100,
    },
    {
      code: "131",
      name: "Test Product",
      price: 100,
    },
  ];

  it("Does not do much!", () => {
    inventoryPage.visit();
    for (const product of products) {
      inventoryPage.productsLink().click();
      const addProductButton = cy.findByRole("button", {
        name: /add product/i,
      });
      addProductButton.click();
      const codeInput = cy.findByLabelText(/code/i);
      codeInput.type(product.code);
      const nameInput = cy.findByLabelText(/name/i);
      nameInput.type(product.name);
      const priceInput = cy.findByLabelText(/price/i);
      priceInput.clear().type(product.price.toString());
      const submitInput = cy.findByRole("button", { name: /submit/i });
      submitInput.click();
    }
  });
});
