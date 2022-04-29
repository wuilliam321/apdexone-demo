import ProductsService, { CreateProductRequest, IProductsDatasource, IProductsService, ListProductRequest } from './products_service';
import ProductsDatasource from './products_datasource';
import { Product } from './models';

describe("Products Create", () => {
  let ds: IProductsDatasource;
  let productsService: IProductsService;
  let request: CreateProductRequest;

  beforeEach(() => {
    ds = new ProductsDatasource();
    productsService = new ProductsService(ds);
    request = new CreateProductRequest("a_code", "iPhone", 1000)
  });

  test("create", () => {
    const [, response] = productsService.create(request);
    expect(response!.code).toBe("a_code");
  });

  test("given an invalid code, should return error", () => {
    request.code = "";
    const [error,] = productsService.create(request);
    expect(error).toBeInstanceOf(Error);
  });

  test("given an invalid name, should return error", () => {
    request.name = "";
    const [error,] = productsService.create(request);
    expect(error).toBeInstanceOf(Error);
  });

  test("given an invalid price, should return error", () => {
    request.price = 0;
    const [error,] = productsService.create(request);
    expect(error).toBeInstanceOf(Error);
  });

  test("given an error in datasource while saving product, should return error", () => {
    ds.add = (_product: Product): [Error?, Product?] => [new Error("error"),];
    productsService = new ProductsService(ds);
    const [error,] = productsService.create(request);
    expect(error).toBeInstanceOf(Error);
  });
});

describe("Products List", () => {
  let ds: IProductsDatasource;
  let productsService: IProductsService;
  let request: ListProductRequest;

  beforeEach(() => {
    ds = new ProductsDatasource();
    productsService = new ProductsService(ds);
    request = new ListProductRequest();
  });

  test("list without products", () => {
    const [, response] = productsService.list(request);
    expect(response!.products).toEqual([] as Product[]);
  });

  test("list with products", () => {
    const products = [new Product("a_code", "iPhone", 1000),] as Product[]
    ds.list = () => [, products];
    const [, response] = productsService.list(request);
    expect(response!.products).toEqual(products);
  });

  test("given an error in datasource while getting products, should return error", () => {
    ds.list = () => [new Error("error"),];
    const [error,] = productsService.list(request);
    expect(error).toBeInstanceOf(Error);
  });
});
