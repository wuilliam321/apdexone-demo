import { HttpClient, IProductService, ListProductParams, ListProductResponse } from "@/lib/interfaces";
import { Product } from "@/lib/models";
import { ProductService } from "@/lib/product_service";

const httpMock = {
  post: jest.fn((): Promise<any> => Promise.resolve([, { code: "123" }])),
  get: jest.fn((): Promise<any> => {
    const res = new ListProductResponse([new Product("123", "test", 1000)]);
    return Promise.resolve([, res])
  })
};

describe("Products: create", () => {
  let httpClient: HttpClient;
  let productService: IProductService;

  beforeEach(() => {
    httpClient = httpMock;
    productService = new ProductService(httpClient);
  });

  it("given a valid product, should create it", async () => {
    const product = new Product("123", "name", 1000);
    const [, res] = await productService.create(product);
    const body = {
      code: product.code,
      name: product.name,
      price: product.price,
    }
    expect(res).toBe(product.code);
    expect(httpMock.post).toBeCalledWith("/products", undefined, body);
  });

  it("given an invalid product, should return error", async () => {
    const product = new Product("", "name", 1000);
    const [error,] = await productService.create(product);
    expect(error).toBeInstanceOf(Error);
  });

  it("given an invalid name, should return error", async () => {
    const product = new Product("123", "", 1000);
    const [error,] = await productService.create(product);
    expect(error).toBeInstanceOf(Error);
  });

  it("given an invalid price, should return error", async () => {
    const product = new Product("123", "name", 0);
    const [error,] = await productService.create(product);
    expect(error).toBeInstanceOf(Error);
  });

  it("given an error while creating, should return error", async () => {
    httpMock.post.mockImplementationOnce((): Promise<any> => Promise.resolve([new Error("error"),]));
    const product = new Product("123", "name", 1000);
    const [error,] = await productService.create(product);
    expect(error).toBeInstanceOf(Error);
  });
});

describe("Products: list", () => {
  let httpClient: HttpClient;
  let productService: IProductService;

  beforeEach(() => {
    httpClient = httpMock;
    productService = new ProductService(httpClient);
  });

  it("given a list request, should return all products", async () => {
    const params: ListProductParams = {};
    const [, res] = await productService.list(params);
    const products = new ListProductResponse([new Product("123", "test", 1000)]);
    expect(res).toEqual(products);
    expect(httpMock.get).toBeCalledWith("/products", undefined);
  });

  it("given an error while getting all products, should return error", async () => {
    httpMock.get.mockImplementationOnce((): Promise<any> => Promise.resolve([new Error("error"),]));
    const params: ListProductParams = {};
    const [error, ] = await productService.list(params);
    expect(error).toBeInstanceOf(Error);
  });
});
