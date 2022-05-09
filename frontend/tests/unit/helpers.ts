import { IProductService, ListProductResponse } from "@/lib/interfaces";
import { Product } from "@/lib/models";

export const mockRoute = {
  params: {
    id: 1,
  },
};

export const mockRouter = {
  push: jest.fn(),
};

export const newProductServiceMock = (
  products: Product[]
): IProductService => ({
  list: jest.fn((): Promise<[Error?, ListProductResponse?]> => {
    return Promise.resolve([undefined, { products: products }]);
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: jest.fn((_product: Product): Promise<[Error?, string?]> => {
    return Promise.resolve([undefined, undefined]);
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update: jest.fn((_product: Product): Promise<[Error?, string?]> => {
    return Promise.resolve([undefined, undefined]);
  }),
  get: jest.fn((productId: string): Promise<[Error?, Product?]> => {
    return Promise.resolve([undefined, new Product(productId, "name", 1000)]);
  }),
});
