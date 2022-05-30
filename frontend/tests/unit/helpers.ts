import {
  IProductService,
  IStockService,
  ListProductResponse,
  ListStockResponse,
} from "@/lib/interfaces";
import { Product, Stock } from "@/lib/models";

export const newMockRoute = () => ({
  params: {
    id: 1,
  },
});

export const newMockRouter = () => ({
  push: jest.fn(),
});

export const newProductServiceMock = (
  products: Product[]
): IProductService => ({
  list: jest.fn((): Promise<[Error?, ListProductResponse?]> => {
    return Promise.resolve([undefined, { products: products }]);
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: jest.fn((_product: Product): Promise<[Error?, string?]> => {
    return Promise.resolve([undefined, "a_code"]);
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update: jest.fn((_product: Product): Promise<[Error?, string?]> => {
    return Promise.resolve([undefined, undefined]);
  }),
  get: jest.fn((productId: string): Promise<[Error?, Product?]> => {
    return Promise.resolve([undefined, new Product(productId, "name", 1000)]);
  }),
  delete: jest.fn((productId: string): Promise<[Error?, string?]> => {
    return Promise.resolve([undefined, productId]);
  }),
});

export const newStockServiceMock = (stocks: Stock[]): IStockService => ({
  list: jest.fn((): Promise<[Error?, ListStockResponse?]> => {
    return Promise.resolve([undefined, { stocks: stocks }]);
  }),
});
