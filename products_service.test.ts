import ProductsService, { CreateProductRequest, IProductsDatasource, IProductsService, ListProductRequest } from './products_service';
import ProductsDatasource from './products_datasource';
import { Product } from './models';

describe("Products Create", () => {
  let ds: IProductsDatasource;
  let productsService: IProductsService;

  beforeEach(() => {
    ds = new ProductsDatasource();
    productsService = new ProductsService(ds);
  });

  test("create", () => {
    const requestOne = new CreateProductRequest("a_code", "iPhone", 1000)
    const [, responseOne] = productsService.create(requestOne);
    expect(responseOne!.code).toBe("a_code");
  });

  test("given an invalid code, should return error", () => {
    const request = new CreateProductRequest("", "iPhone", 1000)
    const [error,] = productsService.create(request);
    expect(error).toBeInstanceOf(Error);
  });

  test("given an invalid name, should return error", () => {
    const request = new CreateProductRequest("123", "", 1000)
    const [error,] = productsService.create(request);
    expect(error).toBeInstanceOf(Error);
  });

  test("given an invalid price, should return error", () => {
    const request = new CreateProductRequest("123", "iPhone", 0)
    const [error,] = productsService.create(request);
    expect(error).toBeInstanceOf(Error);
  });

  test("given an error in datasource while saving product, should return error", () => {
    ds.add = (_product: Product): [Error?, Product?] => {
      return [new Error("error"),];
    }
    productsService = new ProductsService(ds);
    const request = new CreateProductRequest("123", "iPhone", 99)
    const [error,] = productsService.create(request);
    expect(error).toBeInstanceOf(Error);
  });
});

describe("Products List", () => {
  let ds: IProductsDatasource;
  let productsService: IProductsService;

  beforeEach(() => {
    ds = new ProductsDatasource();
    productsService = new ProductsService(ds);
  });

  test("list without products", () => {
    const requestOne = new ListProductRequest()
    const [, responseOne] = productsService.list(requestOne);
    expect(responseOne!.products).toEqual([] as Product[]);
  });

  test("list with products", () => {
    const products = [
      new Product("a_code", "iPhone", 1000),
    ] as Product[]
    ds.list = () => [,products];
    const requestOne = new ListProductRequest()
    const [, responseOne] = productsService.list(requestOne);
    expect(responseOne!.products).toEqual(products);
  });
});
