import { HttpClient, IProductService } from "@/lib/interfaces";
import { Product } from "@/lib/models";
import { ProductService } from "@/lib/product_service";

const httpMock = {
  post: jest.fn((): Promise<any> => Promise.resolve()),
};

describe("Core: create products", () => {
  let httpClient: HttpClient;
  let productService: IProductService;

  beforeEach(() => {
    httpClient = httpMock;
    productService = new ProductService(httpClient);
  });

  it("given a valid product, should create it", () => {
    const product = new Product("123", "name", 1000);
    const [, res] = productService.create(product);
    const body = {
      code: product.code,
      name: product.name,
      price: product.price,
    }
    expect(res!.code).toBe(product.code);
    expect(httpMock.post).toBeCalledWith("/products", undefined, body);
  });

  it("given an invalid product, should return error", () => {
    const product = new Product("", "name", 1000);
    const [error, ] = productService.create(product);
    expect(error).toBeInstanceOf(Error);
  });

  it("given an invalid name, should return error", () => {
    const product = new Product("123", "", 1000);
    const [error, ] = productService.create(product);
    expect(error).toBeInstanceOf(Error);
  });

  it("given an invalid price, should return error", () => {
    const product = new Product("123", "name", 0);
    const [error, ] = productService.create(product);
    expect(error).toBeInstanceOf(Error);
  });
});
