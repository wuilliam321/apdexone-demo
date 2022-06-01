import StockService from './stock_service';
import { Stock, StockRecord } from '../lib/models';
import { StockDatasourceMock } from '../helpers/tests';
import { IStockDatasource, IStockService } from '../lib/interfaces';
import { CreateStockRecordRequest, ListStockRequest, ReportStockRequest } from '../srv/models';

describe("Stock List", () => {
  let ds: IStockDatasource;
  let stocksService: IStockService;
  let request: ListStockRequest;

  beforeEach(() => {
    ds = new StockDatasourceMock();
    stocksService = new StockService(ds);
    request = new ListStockRequest();
  });

  test("list without stocks", () => {
    const [, response] = stocksService.list(request);
    expect(response!.stocks).toEqual([] as Stock[]);
  });

  test("list with stocks", () => {
    const records = [new StockRecord("a_code", "P1", 10, "CAT", "L", "red")]
    ds.list = () => [, records];
    const [, response] = stocksService.list(request);
    expect(response!.stocks).toEqual(records);
  });

  test("given an error in datasource while getting stocks, should return error", () => {
    ds.list = () => [new Error("error"),];
    const [error,] = stocksService.list(request);
    expect(error).toBeInstanceOf(Error);
  });
});

describe("Stock Report", () => {
  let ds: IStockDatasource;
  let stocksService: IStockService;
  let request: ReportStockRequest;

  beforeEach(() => {
    ds = new StockDatasourceMock();
    stocksService = new StockService(ds);
    request = new ReportStockRequest();
  });

  test("report without records", () => {
    const [, response] = stocksService.report(request);
    expect(response!.records).toEqual([] as StockRecord[]);
  });

  test("report with records, same product addition", () => {
    const records = [
      new StockRecord("MM1", "P1", 10, "CAT", "L", "red"),
      new StockRecord("MM2", "P1", 10, "CAT", "L", "red"),
    ] as StockRecord[]
    const expected = [
      new Stock("P1", 20, "*", "*", "*"),
    ] as Stock[];
    ds.list = () => [, records];
    const [, response] = stocksService.report(request);
    expect(response!.records).toEqual(expected);
  });

  test("report with records, group by category", () => {
    const records = [
      new StockRecord("MM1", "P1", 10, "CAT", "L", "red"),
      new StockRecord("MM2", "P1", 10, "CAT", "L", "red"),
      new StockRecord("MM3", "P2", 10, "CAT", "L", "red"),
      new StockRecord("MM4", "P3", 10, "CAT2", "L", "red"),
    ] as StockRecord[]
    const expected = [
      new Stock("*", 30, "CAT", "*", "*"),
      new Stock("*", 10, "CAT2", "*", "*"),
    ] as Stock[];
    ds.list = () => [, records];
    request.groupBy = "category";
    const [, response] = stocksService.report(request);
    expect(response!.records).toEqual(expected);
  });

  test("report with records, different product addition", () => {
    const records = [
      new StockRecord("MM1", "P1", 10, "CAT", "L", "red"),
      new StockRecord("MM2", "P1", 10, "CAT", "L", "red"),
      new StockRecord("MM3", "P2", 10, "CAT", "L", "red"),
    ] as StockRecord[]
    const expected = [
      new Stock("P1", 20, "*", "*", "*"),
      new Stock("P2", 10, "*", "*", "*"),
    ] as Stock[];
    ds.list = () => [, records];
    const [, response] = stocksService.report(request);
    expect(response!.records).toEqual(expected);
  });

  test("report with records, with a 0 qty product", () => {
    const records = [
      new StockRecord("MM1", "P1", 10, "CAT", "L", "red"),
      new StockRecord("MM2", "P1", 10, "CAT", "L", "red"),
      new StockRecord("MM3", "P2", 10, "CAT", "L", "red"),
      new StockRecord("MM4", "P3", 0, "CAT", "L", "red"),
    ] as StockRecord[]
    const expected = [
      new Stock("P1", 20, "*", "*", "*"),
      new Stock("P2", 10, "*", "*", "*"),
      new Stock("P3", 0, "*", "*", "*"),
    ] as Stock[];
    ds.list = () => [, records];
    const [, response] = stocksService.report(request);
    expect(response!.records).toEqual(expected);
  });

  test("report with records, with substraction", () => {
    const records = [
      new StockRecord("MM1", "P1", 10, "CAT", "L", "red"),
      new StockRecord("MM2", "P1", -10, "CAT", "L", "red"),
    ] as StockRecord[]
    const expected = [
      new Stock("P1", 0, "*", "*", "*"),
    ] as Stock[];
    ds.list = () => [, records];
    const [, response] = stocksService.report(request);
    expect(response!.records).toEqual(expected);
  });

  test("given an error in datasource while getting records, should return error", () => {
    ds.list = () => [new Error("error"),];
    const [error,] = stocksService.report(request);
    expect(error).toBeInstanceOf(Error);
  });
});

describe("StockRecords Create", () => {
  let dsMock: IStockDatasource;
  let stockService: IStockService;
  let request: CreateStockRecordRequest;

  beforeEach(() => {
    dsMock = new StockDatasourceMock();
    stockService = new StockService(dsMock);
    request = new CreateStockRecordRequest("12", "a_code", 1000, "CAT", "L", "red")
  });

  test("create", () => {
    const [, response] = stockService.create(request);
    expect(response!.product_code).toBe("a_code");
  });

  test("given an invalid code, should return error", () => {
    request.code = "";
    const [error,] = stockService.create(request);
    expect(error).toBeInstanceOf(Error);
  });

  test("given an invalid product code, should return error", () => {
    request.product_code = "";
    const [error,] = stockService.create(request);
    expect(error).toBeInstanceOf(Error);
  });

  test("given an error in datasource while saving stockRecord, should return error", () => {
    dsMock.add = (_stockRecord: StockRecord): [Error?, StockRecord?] => [new Error("error"),];
    stockService = new StockService(dsMock);
    const [error,] = stockService.create(request);
    expect(error).toBeInstanceOf(Error);
  });
});

