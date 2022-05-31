import { HttpClient } from "@/lib/http";
import { IProductService, ListProductResponse } from "@/lib/interfaces";
import { Product } from "@/lib/models";
import { ProductService } from "@/lib/product_service";

// TODO: repeated code
const newHttpMock = () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: jest.fn((): Promise<any> => {
    const response = {
      status: 201,
      data: { code: "123" },
    };
    return Promise.resolve([undefined, response]);
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: jest.fn((): Promise<any> => {
    const products = [new Product("123", "test", 1000)];
    const response = {
      status: 201,
      data: products,
    };
    return Promise.resolve([undefined, response]);
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put: jest.fn((): Promise<any> => {
    const response = {
      status: 201,
      data: { code: "123" },
    };
    return Promise.resolve([undefined, response]);
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete: jest.fn((): Promise<any> => {
    const response = {
      status: 201,
      data: { code: "123" },
    };
    return Promise.resolve([undefined, response]);
  }),
});

describe("Products: create", () => {
  let httpClient: HttpClient;
  let productService: IProductService;

  beforeEach(() => {
    httpClient = newHttpMock();
    productService = new ProductService(httpClient);
  });

  it("given a valid product, should create it", async () => {
    const product = new Product("123", "name", 1000);
    const [, res] = await productService.create(product);
    const body = {
      code: product.code,
      name: product.name,
      price: product.price,
    };
    expect(res).toBe(product.code);
    expect(httpClient.post).toBeCalledWith("/products", undefined, body);
  });

  it("given an invalid product, should return error", async () => {
    const product = new Product("", "name", 1000);
    const [error] = await productService.create(product);
    expect(error).toBeInstanceOf(Error);
  });

  it("given an invalid name, should return error", async () => {
    const product = new Product("123", "", 1000);
    const [error] = await productService.create(product);
    expect(error).toBeInstanceOf(Error);
  });

  it("given an invalid price, should return error", async () => {
    const product = new Product("123", "name", 0);
    const [error] = await productService.create(product);
    expect(error).toBeInstanceOf(Error);
  });

  it("given an error while creating, should return error", async () => {
    httpClient.post = (): Promise<any> => Promise.resolve([new Error("error")]);
    const product = new Product("123", "name", 1000);
    const [error] = await productService.create(product);
    expect(error).toBeInstanceOf(Error);
  });
});

describe("Products: list", () => {
  let httpClient: HttpClient;
  let productService: IProductService;

  beforeEach(() => {
    httpClient = newHttpMock();
    productService = new ProductService(httpClient);
  });

  it("given a list request, should return all products", async () => {
    const [, res] = await productService.list();
    const products = new ListProductResponse([
      new Product("123", "test", 1000),
    ]);
    expect(res).toEqual(products);
    expect(httpClient.get).toBeCalledWith("/products", undefined);
  });

  it("given an error while getting all products, should return error", async () => {
    httpClient.get = (): Promise<any> => Promise.resolve([new Error("error")]);
    const [error] = await productService.list();
    expect(error).toBeInstanceOf(Error);
  });
});

describe("Products: get", () => {
  let httpClient: HttpClient;
  let productService: IProductService;

  beforeEach(() => {
    httpClient = newHttpMock();
    httpClient.get = jest.fn((): Promise<any> => {
      const product = new Product("123", "test", 1000);
      const response = {
        status: 201,
        data: product,
      };
      return Promise.resolve([undefined, response]);
    });
    productService = new ProductService(httpClient);
  });

  it("given a valid product id, should return the given product", async () => {
    const productCode = "123";
    const [, res] = await productService.get(productCode);
    expect(res).toEqual({ code: "123", name: "test", price: 1000 });
    expect(httpClient.get).toBeCalledWith(
      `/products/${productCode}`,
      undefined
    );
  });

  it("given an error while getting, should return error", async () => {
    httpClient.get = (): Promise<any> => Promise.resolve([new Error("error")]);
    const [error] = await productService.get("1234");
    expect(error).toBeInstanceOf(Error);
  });
});

describe("Products: update", () => {
  let httpClient: HttpClient;
  let productService: IProductService;

  beforeEach(() => {
    httpClient = newHttpMock();
    productService = new ProductService(httpClient);
  });

  it("given a valid product, should update it", async () => {
    const product = new Product("123", "name", 1000);
    const [, res] = await productService.update(product);
    const body = {
      code: product.code,
      name: product.name,
      price: product.price,
    };
    expect(res).toBe(product.code);
    expect(httpClient.put).toBeCalledWith("/products/123", undefined, body);
  });

  it("given an invalid product, should return error", async () => {
    const product = new Product("", "name", 1000);
    const [error] = await productService.update(product);
    expect(error).toBeInstanceOf(Error);
  });

  it("given an invalid name, should return error", async () => {
    const product = new Product("123", "", 1000);
    const [error] = await productService.update(product);
    expect(error).toBeInstanceOf(Error);
  });

  it("given an invalid price, should return error", async () => {
    const product = new Product("123", "name", 0);
    const [error] = await productService.update(product);
    expect(error).toBeInstanceOf(Error);
  });

  it("given an error while creating, should return error", async () => {
    httpClient.put = (): Promise<any> => Promise.resolve([new Error("error")]);
    const product = new Product("123", "name", 1000);
    const [error] = await productService.update(product);
    expect(error).toBeInstanceOf(Error);
  });
});

describe("Products: delete", () => {
  let httpClient: HttpClient;
  let productService: IProductService;

  beforeEach(() => {
    httpClient = newHttpMock();
    productService = new ProductService(httpClient);
  });

  it("given a valid product code, should delete it", async () => {
    const productCode = "123";
    const [, res] = await productService.delete(productCode);
    expect(res).toBe(productCode);
    expect(httpClient.delete).toBeCalledWith("/products/123", undefined);
  });

  it("given an invalid product code, should return error", async () => {
    const [error] = await productService.delete("");
    expect(error).toBeInstanceOf(Error);
  });

  it("given an error while creating, should return error", async () => {
    httpClient.delete = (): Promise<any> =>
      Promise.resolve([new Error("error")]);
    const [error] = await productService.delete("123");
    expect(error).toBeInstanceOf(Error);
  });
});
