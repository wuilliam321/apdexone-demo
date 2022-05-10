import ProductsService from './products_service';
import { Product } from '../lib/models';
import { DatasourceMock } from '../helpers/tests';
import { IProductsDatasource, IProductsService } from '../lib/interfaces';
import { CreateProductRequest, GetProductRequest, ListProductRequest, UpdateProductRequest } from '../srv/models';

describe("Products Create", () => {
  let dsMock: IProductsDatasource;
  let productsService: IProductsService;
  let request: CreateProductRequest;

  beforeEach(() => {
    dsMock = new DatasourceMock();
    productsService = new ProductsService(dsMock);
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
    dsMock.add = (_product: Product): [Error?, Product?] => [new Error("error"),];
    productsService = new ProductsService(dsMock);
    const [error,] = productsService.create(request);
    expect(error).toBeInstanceOf(Error);
  });
});

describe("Products List", () => {
  let ds: IProductsDatasource;
  let productsService: IProductsService;
  let request: ListProductRequest;

  beforeEach(() => {
    ds = new DatasourceMock();
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

describe("Products Get", () => {
  let ds: IProductsDatasource;
  let productsService: IProductsService;
  let request: GetProductRequest;

  beforeEach(() => {
    ds = new DatasourceMock();
    productsService = new ProductsService(ds);
    request = new GetProductRequest("a_code");
  });

  test("get product", () => {
    const [, response] = productsService.get(request);
    expect(response!.product).toEqual(new Product("a_code", "iPhone", 1000));
  });

  test("get an invalid code", () => {
    ds.getByCode = () => [,undefined];
    request.code = "invalid";
    const [, response] = productsService.get(request);
    expect(response!.product).toEqual(undefined);
  });

  test("given an error in datasource while getting product, should return error", () => {
    ds.getByCode = () => [new Error("error"),];
    const [error,] = productsService.get(request);
    expect(error).toBeInstanceOf(Error);
  });
});

describe("Products Update", () => {
  let dsMock: IProductsDatasource;
  let productsService: IProductsService;
  let request: UpdateProductRequest;

  beforeEach(() => {
    dsMock = new DatasourceMock();
    productsService = new ProductsService(dsMock);
    request = new UpdateProductRequest("a_code", "iPhone", 1000)
  });

  test("update", () => {
    const [, response] = productsService.update(request);
    expect(response!.code).toBe("a_code");
  });

  test("given an invalid code, should return error", () => {
    request.code = "";
    const [error,] = productsService.update(request);
    expect(error).toBeInstanceOf(Error);
  });

  test("given an invalid name, should return error", () => {
    request.name = "";
    const [error,] = productsService.update(request);
    expect(error).toBeInstanceOf(Error);
  });

  test("given an invalid price, should return error", () => {
    request.price = 0;
    const [error,] = productsService.update(request);
    expect(error).toBeInstanceOf(Error);
  });

  test("given an error in datasource while saving product, should return error", () => {
    dsMock.edit = (_product: Product): [Error?, Product?] => [new Error("error"),];
    productsService = new ProductsService(dsMock);
    const [error,] = productsService.update(request);
    expect(error).toBeInstanceOf(Error);
  });
});
