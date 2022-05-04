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

export const newProductServiceMock = (products: Product[]): IProductService => ({
  list: jest.fn((): Promise<[Error?, ListProductResponse?]> => {
    return Promise.resolve([undefined, { products: products }]);
  }),
  create: jest.fn((_product: Product): Promise<[Error?, string?]> => {
    return Promise.resolve([undefined, undefined]);
  }),
});
