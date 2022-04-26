import ProductsService from './products_service';
import ProductsDatasource from './products_datasource';

const productsService = new ProductsService(new ProductsDatasource());

describe("Products", () => {
  test("create", () => {
    // Create product API
    const [responseOne] = productsService.create({
      name: "iPhone",
      price: 1000,
    });
    expect(responseOne!.id).toBe(1);
    const [responseTwo] = productsService.create({
      name: "a product",
      price: 200,
    });
    expect(responseTwo!.id).toBe(2);
  });

  test("given an invalid name, should return error", () => {
    // Create product API
    const [_, error] = productsService.create({
      name: "",
      price: 1000,
    });
    expect(error).toBeInstanceOf(Error);
  });

  test("given an invalid price, should return error", () => {
    // Create product API
    const [_, error] = productsService.create({
      name: "A good name",
      price: 0,
    });
    expect(error).toBeInstanceOf(Error);
  });
});
