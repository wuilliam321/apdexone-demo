import { getMockReq, getMockRes } from '@jest-mock/express'
import HttpServer from './http';
import { CreateProductRequest, CreateProductResponse, ListProductRequest, ListProductResponse } from './models';
import { DatasourceMock } from '../helpers/tests';
import { Product } from '../lib/models';
import ProductsService from '../lib/products_service';
import { IProductsService } from '../lib/interfaces';

describe('ProductsHttp Create', () => {
  let server: HttpServer;
  let service: IProductsService;
  let handler: (req: any, res: any) => void;

  beforeEach(() => {
    service = new ProductsService(new DatasourceMock());
    server = new HttpServer(service);
    handler = server.handleCreateProduct();
  });

  test('given a product, should create it', () => {
    const req = getMockReq({
      body: {
        code: '123',
        name: 'test',
        price: 10,
      }
    });
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test('given an invalid body, should return 400 error', () => {
    const req = getMockReq({
      body: null,
    });
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('given an invalid code, should return 400 error', () => {
    const req = getMockReq({
      body: {
        code: '',
        name: 'name',
        price: 10,
      },
    });
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('given an invalid name, should return 400 error', () => {
    const req = getMockReq({
      body: {
        code: '123',
        name: '',
        price: 10,
      },
    });
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('given an invalid price, should return 400 error', () => {
    const req = getMockReq({
      body: {
        code: '123',
        name: 'valid',
        price: 0,
      },
    });
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('given an internal error, should return 500 error', () => {
    service.create = (_req: CreateProductRequest): [Error?, CreateProductResponse?] => {
      return [new Error('test'),];
    };
    const req = getMockReq({
      body: {
        code: '123',
        name: 'valid',
        price: 100,
      },
    });
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('ProductsHttp List', () => {
  let server: HttpServer;
  let service: IProductsService;
  let handler: (req: any, res: any) => void;

  beforeEach(() => {
    service = new ProductsService(new DatasourceMock());
    server = new HttpServer(service);
    handler = server.handleListProducts();
  });

  test('given that there are no products, should return an empty list of products', () => {
    service.list = (_req: ListProductRequest): [Error?, ListProductResponse?] => {
      return [, new ListProductResponse([] as Product[])];
    };
    const req = getMockReq();
    const products = [] as Product[];
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(products);
  });

  test('given a product, should return a list of products', () => {
    const products = [{
      code: '125',
      name: 'test',
      price: 10,
    },] as Product[];
    service.list = (_req: ListProductRequest): [Error?, ListProductResponse?] => {
      return [, new ListProductResponse(products)];
    };
    server = new HttpServer(service);
    handler = server.handleListProducts();
    const req = getMockReq();
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(products);
  });

  test('given an internal error, should return 500 error', () => {
    service.list = (_req: ListProductRequest): [Error?, ListProductResponse?] => {
      return [new Error('test'),];
    };
    handler = server.handleListProducts();
    const req = getMockReq();
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
