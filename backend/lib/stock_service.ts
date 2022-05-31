import { IStockDatasource, IStockService } from "../lib/interfaces";
import { CreateStockRecordRequest, CreateStockRecordResponse, ListStockRequest, ListStockResponse, ReportStockOptions, ReportStockRequest, ReportStockResponse } from "../srv/models";
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

  report(req: ReportStockRequest): [Error?, ReportStockResponse?] {
    const [error, records] = this.stocksDS.list();
    if (error) {
      return [error,];
    }

    if (!records || records.length === 0) {
      return [, new ReportStockResponse([] as StockRecord[])];
    }


    const options: ReportStockOptions = { groupBy: {} };
    if (req.groupBy && req.groupBy.length > 0) {
      options.groupBy![req.groupBy] = true;
    }

    return [, new ReportStockResponse(records, options)];
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

    const stockRecord = new StockRecord(req.code, req.product_code, req.quantity, req.category, req.size);
    const [error, result] = this.stocksDS.add(stockRecord);
    if (error) {
      return [error,];
    }

    return [, new CreateStockRecordResponse(result!.product_code)];

  }
}

export default StockService;

