import ProductsService from './products_service';
import ProductsDatasource from './products_datasource';

const ds = new ProductsDatasource();
const productsService = new ProductsService(ds);

describe("Products", () => {
  test("create", () => {
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
    const [_, error] = productsService.create({
      name: "",
      price: 1000,
    });
    expect(error).toBeInstanceOf(Error);
  });

  test("given an invalid price, should return error", () => {
    const [_, error] = productsService.create({
      name: "A good name",
      price: 0,
    });
    expect(error).toBeInstanceOf(Error);
  });
  // TODO: given an error while adding a product, should return error
});
