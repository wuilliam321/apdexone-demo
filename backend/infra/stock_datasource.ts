import Loki, { Collection } from 'lokijs';
import { StockRecord } from '../lib/models';
import { IStockDatasource } from '../lib/interfaces';

class StocksLokiDatasource implements IStockDatasource {
  private stocks: Collection<StockRecord>;

  constructor(private db: Loki) {
    this.stocks = this.db.addCollection('stocks', {
      indices: ['code'],
      unique: ['code'],
    });
  }

  list(): [Error?, StockRecord[]?] {
    try {
      const res = this.stocks.find();
      return [, res];
    } catch (e) {
      return [this.handleError(e as Error),];
    }
  }

  add(stockRecord: StockRecord): [Error?, StockRecord?] {
    try {
      const res = this.stocks.insert(stockRecord);
      if (!res) {
        return [new Error('Failed to add stockRecord'),];
      }
      return [, res];
    } catch (e) {
      return [this.handleError(e as Error),];
    }
  }

  handleError(e: Error): Error {
    const message = e instanceof Error ? e.message : "Unknown error";
    return new Error(message);
  }
}

export default StocksLokiDatasource;

