import { IStockDatasource, IStockService } from "../lib/interfaces";
import { ListStockRequest, ListStockResponse, ReportStockRequest, ReportStockResponse } from "../srv/models";
import { StockRecord } from "./models";

class StockService implements IStockService {
  constructor(private stocksDS: IStockDatasource) { }

  list(_req: ListStockRequest): [Error?, ListStockResponse?] {
    const [error, stocks] = this.stocksDS.list();
    if (error) {
      return [error,];
    }
    return [, new ListStockResponse(stocks!)];
  }

  report(_req: ReportStockRequest): [Error?, ReportStockResponse?] {
    const [error, records] = this.stocksDS.list();
    if (error) {
      return [error,];
    }

    if (!records || records.length === 0) {
      return [, new ReportStockResponse([] as StockRecord[])];
    }

    return [, new ReportStockResponse(records)];
  }
}

export default StockService;

