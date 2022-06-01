import { HttpClient } from "@/lib/http";
import { IStockService, ListStockResponse, ReportStockParams, ReportStockResponse } from "@/lib/interfaces";
import { Stock, StockRecord } from "@/lib/models";
import { StockService } from "@/lib/stock_service";

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
    const stockRecords = [new StockRecord("123", "test", 1000, "CAT", "L", "red", 1.0)];
    const response = {
      status: 201,
      data: stockRecords,
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

describe("StockRecords: create", () => {
  let httpClient: HttpClient;
  let stockService: IStockService;

  beforeEach(() => {
    httpClient = newHttpMock();
    stockService = new StockService(httpClient);
  });

  it("given a valid stockRecord, should create it", async () => {
    const stockRecord = new StockRecord("123", "name", 1000, "CAT", "L", "red", 1.0);
    const [, res] = await stockService.create(stockRecord);
    const body = {
      code: stockRecord.code,
      product_code: stockRecord.product_code,
      quantity: stockRecord.quantity,
      category: stockRecord.category,
      size: stockRecord.size,
      color: stockRecord.color,
      amount: stockRecord.amount,
    };
    expect(res).toBe(stockRecord.code);
    expect(httpClient.post).toBeCalledWith("/stock", undefined, body);
  });

  it("given an invalid code, should return error", async () => {
    const stockRecord = new StockRecord("", "name", 1000, "CAT", "L", "red", 1.0);
    const [error] = await stockService.create(stockRecord);
    expect(error).toBeInstanceOf(Error);
  });

  it("given an invalid product code, should return error", async () => {
    const stockRecord = new StockRecord("123", "", 1000, "CAT", "L", "red", 1.0);
    const [error] = await stockService.create(stockRecord);
    expect(error).toBeInstanceOf(Error);
  });

  it("given an invalid quantity, should return error", async () => {
    const stockRecord = new StockRecord("123", "name", 0, "CAT", "L", "red", 1.0);
    const [error] = await stockService.create(stockRecord);
    expect(error).toBeInstanceOf(Error);
  });

  it("given an error while creating, should return error", async () => {
    httpClient.post = (): Promise<any> => Promise.resolve([new Error("error")]);
    const stockRecord = new StockRecord("123", "name", 1000, "CAT", "L", "red", 1.0);
    const [error] = await stockService.create(stockRecord);
    expect(error).toBeInstanceOf(Error);
  });
});

describe("StockRecords: list", () => {
  let httpClient: HttpClient;
  let stockService: IStockService;

  beforeEach(() => {
    httpClient = newHttpMock();
    stockService = new StockService(httpClient);
  });

  it("given a list request, should return all stock", async () => {
    const [, res] = await stockService.list();
    const records = new ListStockResponse([
      new StockRecord("123", "test", 1000, "CAT", "L", "red", 1.0),
    ]);
    expect(res).toEqual(records);
    expect(httpClient.get).toBeCalledWith("/stock", undefined);
  });

  it("given an error while getting all stock, should return error", async () => {
    httpClient.get = (): Promise<any> => Promise.resolve([new Error("error")]);
    const [error] = await stockService.list();
    expect(error).toBeInstanceOf(Error);
  });
});

describe("StockRecords: report", () => {
  let httpClient: HttpClient;
  let stockService: IStockService;

  beforeEach(() => {
    httpClient = newHttpMock();
    httpClient.get = jest.fn((): Promise<any> => {
      const stocks = [new Stock("123", 10, "CAT", "L", "red", 1.0)]
      const response = {
        status: 201,
        data: stocks,
      };
      return Promise.resolve([undefined, response]);
    });
    stockService = new StockService(httpClient);
  });

  it("given a list request, should return all stock", async () => {
    const params = new ReportStockParams();
    const [, res] = await stockService.report(params);
    const stocks = new ReportStockResponse([
      new Stock("123", 10, "CAT", "L", "red", 1.0),
    ]);
    expect(res).toEqual(stocks);
    expect(httpClient.get).toBeCalledWith("/stock/report", undefined);
  });

  it("given a list request group by product_code, should return all stock", async () => {
    const params = new ReportStockParams("product_code");
    await stockService.report(params);
    expect(httpClient.get).toBeCalledWith("/stock/report?groupBy=product_code", undefined);
  });

  it("given a list request group by category, should return all stock", async () => {
    const params = new ReportStockParams("category");
    await stockService.report(params);
    expect(httpClient.get).toBeCalledWith("/stock/report?groupBy=category", undefined);
  });

  it("given a list request group by size, should return all stock", async () => {
    const params = new ReportStockParams("size");
    await stockService.report(params);
    expect(httpClient.get).toBeCalledWith("/stock/report?groupBy=size", undefined);
  });

  it("given a list request group by color, should return all stock", async () => {
    const params = new ReportStockParams("color");
    await stockService.report(params);
    expect(httpClient.get).toBeCalledWith("/stock/report?groupBy=color", undefined);
  });

  it("given an error while getting the report, should return error", async () => {
    httpClient.get = (): Promise<any> => Promise.resolve([new Error("error")]);
    const [error] = await stockService.report();
    expect(error).toBeInstanceOf(Error);
  });
});
