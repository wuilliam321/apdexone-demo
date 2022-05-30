import { IStockDatasource, IStockService } from "../lib/interfaces";
import { ListStockRequest, ListStockResponse } from "../srv/models";

class StockService implements IStockService {
  constructor(private stocksDS: IStockDatasource) { }

  list(_req: ListStockRequest): [Error?, ListStockResponse?] {
    const [error, stocks] = this.stocksDS.list();
    if (error) {
      return [error,];
    }
    return [, new ListStockResponse(stocks!)];
  }

}

export default StockService;

