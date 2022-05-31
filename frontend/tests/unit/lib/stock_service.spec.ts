import { HttpClient } from "@/lib/http";
import { IStockService } from "@/lib/interfaces";
import { StockRecord } from "@/lib/models";
import { StockService } from "@/lib/stock_service";

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
    const stockRecords = [new StockRecord("123", "test", 1000)];
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
    const stockRecord = new StockRecord("123", "name", 1000);
    const [, res] = await stockService.create(stockRecord);
    const body = {
      code: stockRecord.code,
      product_code: stockRecord.product_code,
      quantity: stockRecord.quantity,
    };
    expect(res).toBe(stockRecord.code);
    expect(httpClient.post).toBeCalledWith("/stock", undefined, body);
  });

  it("given an invalid code, should return error", async () => {
    const stockRecord = new StockRecord("", "name", 1000);
    const [error] = await stockService.create(stockRecord);
    expect(error).toBeInstanceOf(Error);
  });

  it("given an invalid product code, should return error", async () => {
    const stockRecord = new StockRecord("123", "", 1000);
    const [error] = await stockService.create(stockRecord);
    expect(error).toBeInstanceOf(Error);
  });

  it("given an invalid quantity, should return error", async () => {
    const stockRecord = new StockRecord("123", "name", 0);
    const [error] = await stockService.create(stockRecord);
    expect(error).toBeInstanceOf(Error);
  });

  it("given an error while creating, should return error", async () => {
    httpClient.post = (): Promise<any> => Promise.resolve([new Error("error")]);
    const stockRecord = new StockRecord("123", "name", 1000);
    const [error] = await stockService.create(stockRecord);
    expect(error).toBeInstanceOf(Error);
  });
});
