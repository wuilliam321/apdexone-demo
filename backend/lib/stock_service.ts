import { IStockDatasource, IStockService } from "../lib/interfaces";
import { CreateStockRecordRequest, CreateStockRecordResponse, ListStockRequest, ListStockResponse, ReportStockRequest, ReportStockResponse } from "../srv/models";
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


  create(req: CreateStockRecordRequest): [Error?, CreateStockRecordResponse?] {
    if (req.code.length === 0) {
      return [new Error("code is required"),];
    }

    if (req.product_code.length === 0) {
      return [new Error("product_code is required"),];
    }

    if (!Number.isInteger(req.quantity)) {
      return [new Error("quantity is required"),];
    }

    const stockRecord = new StockRecord(req.code, req.product_code, req.quantity);
    const [error, result] = this.stocksDS.add(stockRecord);
    if (error) {
      return [error,];
    }

    return [, new CreateStockRecordResponse(result!.product_code)];

  }
}

export default StockService;

