import StockService from './stock_service';
import { Stock } from '../lib/models';
import { StockDatasourceMock } from '../helpers/tests';
import { IStockDatasource, IStockService } from '../lib/interfaces';
import { ListStockRequest } from '../srv/models';

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
    const stocks = [new Stock("MM1", "P1", 10),] as Stock[]
    ds.list = () => [, stocks];
    const [, response] = stocksService.list(request);
    expect(response!.stocks).toEqual(stocks);
  });

  test("given an error in datasource while getting stocks, should return error", () => {
    ds.list = () => [new Error("error"),];
    const [error,] = stocksService.list(request);
    expect(error).toBeInstanceOf(Error);
  });
});

