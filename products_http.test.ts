import { getMockReq, getMockRes } from '@jest-mock/express'
import ProductsDatasource from './products_datasource';
import ProductsHttp from './products_http';
import ProductsService, { CreateProductRequest, CreateProductResponse, IProductsService } from './products_service';


describe('ProductsHttp', () => {
  let productsHttp: ProductsHttp;
  let ds: ProductsDatasource;
  let service: IProductsService;
  let handler: (req: any, res: any) => void;

  beforeEach(() => {
    ds = new ProductsDatasource();
    service = new ProductsService(ds);
    productsHttp = new ProductsHttp(service);
    handler = productsHttp.handleCreateProduct();
  });

  test('given a product, should create it', () => {
    const req = getMockReq({
      body: {
        name: 'test',
        price: 10,
      },
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

  test('given an invalid name, should return 400 error', () => {
    const req = getMockReq({
      body: {
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
        name: 'valid',
        price: 0,
      },
    });
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('given an internal error, should return 500 error', () => {
    const service: IProductsService = {
      create(_req: CreateProductRequest): [CreateProductResponse?, Error?] {
        return [, new Error('test')];
      }
    }
    productsHttp = new ProductsHttp(service);
    handler = productsHttp.handleCreateProduct();
    const req = getMockReq({
      body: {
        name: 'valid',
        price: 100,
      },
    });
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
