import ProductsService, { IProductsDatasource, IProductsService } from './products_service';
import ProductsDatasource from './products_datasource';
import { Product } from './models';

describe("Products", () => {
  let ds: IProductsDatasource;
  let productsService: IProductsService;

  beforeEach(() => {
    ds = new ProductsDatasource();
    productsService = new ProductsService(ds);
  });

  test("create", () => {
    const [,responseOne] = productsService.create({
      name: "iPhone",
      price: 1000,
    });
    expect(responseOne!.id).toBe(1);
    const [,responseTwo] = productsService.create({
      name: "a product",
      price: 200,
    });
    expect(responseTwo!.id).toBe(2);
  });

  test("given an invalid name, should return error", () => {
    const [error,] = productsService.create({
      name: "",
      price: 1000,
    });
    expect(error).toBeInstanceOf(Error);
  });

  test("given an invalid price, should return error", () => {
    const [error,] = productsService.create({
      name: "A good name",
      price: 0,
    });
    expect(error).toBeInstanceOf(Error);
  });

  test("given an error in datasource while saving product, should return error", () => {
    ds = {
      add(_product: Product): [Error?, Product?] {
        return [new Error("error"),];
      }
    }
    productsService = new ProductsService(ds);
    const [error,] = productsService.create({
      name: "A good name",
      price: 99,
    });
    expect(error).toBeInstanceOf(Error);
  });
});
