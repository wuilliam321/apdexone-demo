import { getMockReq, getMockRes } from '@jest-mock/express'
import HttpServer from './http';
import { CreateProductRequest, CreateProductResponse, CreateStockRecordRequest, CreateStockRecordResponse, DeleteProductRequest, DeleteProductResponse, GetProductRequest, GetProductResponse, ListProductRequest, ListProductResponse, ListStockRequest, ListStockResponse, ReportStockRequest, ReportStockResponse, UpdateProductRequest, UpdateProductResponse } from './models';
import { ProductDatasourceMock, StockDatasourceMock } from '../helpers/tests';
import { Product, Stock, StockRecord } from '../lib/models';
import ProductsService from '../lib/products_service';
import StockService from '../lib/stock_service';
import { IProductsService, IStockService } from '../lib/interfaces';

describe('ProductsHttp Create', () => {
  let server: HttpServer;
  let service: IProductsService;
  let handler: (req: any, res: any) => void;

  beforeEach(() => {
    service = new ProductsService(new ProductDatasourceMock());
    server = new HttpServer(service, undefined);
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
    expect(res.send).toHaveBeenCalledWith({ message: "test" });
  });
});

describe('ProductsHttp List', () => {
  let server: HttpServer;
  let service: IProductsService;
  let handler: (req: any, res: any) => void;

  beforeEach(() => {
    service = new ProductsService(new ProductDatasourceMock());
    server = new HttpServer(service, undefined);
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
    server = new HttpServer(service, undefined);
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
    expect(res.send).toHaveBeenCalledWith({ message: "test" });
  });


  // TODO: update product test
});

describe('ProductsHttp Get', () => {
  let server: HttpServer;
  let service: IProductsService;
  let handler: (req: any, res: any) => void;

  beforeEach(() => {
    service = new ProductsService(new ProductDatasourceMock());
    server = new HttpServer(service, undefined);
    handler = server.handleGetProduct();
  });

  test('given a product id, should return it', () => {
    const product = new Product('123', 'test', 10);
    service.get = (_req: GetProductRequest): [Error?, GetProductResponse?] => {
      return [, new GetProductResponse(product)];
    };
    const req = getMockReq({
      params: {
        id: '123',
      },
    });
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(product);
  });

  test('given an unexistent id, should return empty', () => {
    service.get = (_req: GetProductRequest): [Error?, GetProductResponse?] => {
      return [, new GetProductResponse({} as Product)];
    };
    server = new HttpServer(service, undefined);
    handler = server.handleGetProduct();
    const req = getMockReq({
      params: {
        id: '123',
      },
    });
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({} as Product);
  });

  test('given an internal error, should return 500 error', () => {
    service.get = (_req: GetProductRequest): [Error?, GetProductResponse?] => {
      return [new Error('test'),];
    };
    handler = server.handleGetProduct();
    const req = getMockReq();
    const { res } = getMockRes();
    handler(req, res);
    expect(res.send).toHaveBeenCalledWith({ message: "test" });
  });
});

describe('ProductsHttp Update', () => {
  let server: HttpServer;
  let service: IProductsService;
  let handler: (req: any, res: any) => void;

  beforeEach(() => {
    service = new ProductsService(new ProductDatasourceMock());
    server = new HttpServer(service, undefined);
    handler = server.handleUpdateProduct();
  });

  test('given a product, should update it', () => {
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
    service.update = (_req: UpdateProductRequest): [Error?, UpdateProductResponse?] => {
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
    expect(res.send).toHaveBeenCalledWith({ message: "test" });
  });
});

describe('ProductsHttp Delete', () => {
  let server: HttpServer;
  let service: IProductsService;
  let handler: (req: any, res: any) => void;

  beforeEach(() => {
    service = new ProductsService(new ProductDatasourceMock());
    server = new HttpServer(service, undefined);
    handler = server.handleDeleteProduct();
  });

  test('given a product, should delete it', () => {
    const req = getMockReq({
      params: {
        id: '123',
      },
    });
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  test('given an invalid code, should return 400 error', () => {
    const req = getMockReq({
      params: {
        id: '',
      },
    });
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('given an internal error, should return 500 error', () => {
    service.delete = (_req: DeleteProductRequest): [Error?, DeleteProductResponse?] => {
      return [new Error('test'),];
    };
    const req = getMockReq({
      params: {
        id: '123',
      },
    });
    const { res } = getMockRes();
    handler(req, res);
    expect(res.send).toHaveBeenCalledWith({ message: "test" });
  });
});

describe('StocksHttp List', () => {
  let server: HttpServer;
  let service: IStockService;
  let handler: (req: any, res: any) => void;

  beforeEach(() => {
    service = new StockService(new StockDatasourceMock());
    server = new HttpServer(undefined, service);
    handler = server.handleListStock();
  });

  test('given that there are no stocks, should return an empty list of stocks', () => {
    service.list = (_req: ListStockRequest): [Error?, ListStockResponse?] => {
      return [, new ListStockResponse([] as Stock[])];
    };
    const req = getMockReq();
    const stocks = [] as Stock[];
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(stocks);
  });

  test('given a stock, should return a list of stocks', () => {
    const stocks = [{
      product_code: 'P1',
      quantity: 10,
    },] as Stock[];
    service.list = (_req: ListStockRequest): [Error?, ListStockResponse?] => {
      return [, new ListStockResponse(stocks)];
    };
    server = new HttpServer(undefined, service);
    handler = server.handleListStock();
    const req = getMockReq();
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(stocks);
  });

  test('given an internal error, should return 500 error', () => {
    service.list = (_req: ListStockRequest): [Error?, ListStockResponse?] => {
      return [new Error('test'),];
    };
    handler = server.handleListStock();
    const req = getMockReq();
    const { res } = getMockRes();
    handler(req, res);
    expect(res.send).toHaveBeenCalledWith({ message: "test" });
  });


  // TODO: update stock test
});

describe('StocksHttp Report', () => {
  let server: HttpServer;
  let service: IStockService;
  let handler: (req: any, res: any) => void;

  beforeEach(() => {
    service = new StockService(new StockDatasourceMock());
    server = new HttpServer(undefined, service);
    handler = server.handleReportStock();
  });

  test('given that there are no records, should return an empty list of records', () => {
    service.report = (_req: ReportStockRequest): [Error?, ReportStockResponse?] => {
      return [, new ReportStockResponse([] as StockRecord[])];
    };
    const req = getMockReq();
    const records = [] as StockRecord[];
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(records);
  });

  test('given a record, should return a list of records', () => {
    const records = [{
      code: 'a_code',
      product_code: 'P1',
      quantity: 10,
    },] as StockRecord[];
    service.report = (_req: ReportStockRequest): [Error?, ReportStockResponse?] => {
      return [, new ReportStockResponse(records)];
    };
    server = new HttpServer(undefined, service);
    handler = server.handleReportStock();
    const req = getMockReq();
    const { res } = getMockRes();
    handler(req, res);

    const expected = [
      new Stock("P1", 10, "*", "*"),
    ] as Stock[];

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(expected);
  });

  test('given an internal error, should return 500 error', () => {
    service.report = (_req: ReportStockRequest): [Error?, ReportStockResponse?] => {
      return [new Error('test'),];
    };
    handler = server.handleReportStock();
    const req = getMockReq();
    const { res } = getMockRes();
    handler(req, res);
    expect(res.send).toHaveBeenCalledWith({ message: "test" });
  });
});

describe('StocksHttp Create stock record', () => {
  let server: HttpServer;
  let service: IStockService;
  let handler: (req: any, res: any) => void;

  beforeEach(() => {
    service = new StockService(new StockDatasourceMock());
    server = new HttpServer(undefined, service);
    handler = server.handleCreateStockRecord();
  });

  test('given a stock creation request, should create it', () => {
    const req = getMockReq({
      body: {
        code: '123',
        product_code: '123',
        quantity: 10,
        // TODO: eventually add more values to identify the transaction
      }
    });
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  test('given a stock creation request (with qty as text), should create it', () => {
    const req = getMockReq({
      body: {
        code: '123',
        product_code: '123',
        quantity: "10",
      }
    });
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledTimes(1);
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
        product_code: '123',
        quantity: 10,
      },
    });
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('given an invalid product code, should return 400 error', () => {
    const req = getMockReq({
      body: {
        code: '123',
        product_code: '',
        quantity: 10,
      },
    });
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('given an invalid quantity, should return 400 error', () => {
    const req = getMockReq({
      body: {
        code: '123',
        product_code: '123',
        quantity: null,
      },
    });
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('given an text as quantity, should return 400 error', () => {
    const req = getMockReq({
      body: {
        code: '123',
        product_code: '123',
        quantity: "invalid",
      },
    });
    const { res } = getMockRes();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('given an internal error, should return 500 error', () => {
    service.create = (_req: CreateStockRecordRequest): [Error?, CreateStockRecordResponse?] => {
      return [new Error('test'),];
    };
    const req = getMockReq({
      body: {
        code: '123',
        product_code: '123',
        quantity: 10,
      },
    });
    const { res } = getMockRes();
    handler(req, res);
    expect(res.send).toHaveBeenCalledWith({ message: "test" });
  });
});
