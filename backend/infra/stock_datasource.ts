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
    this.stocks.insert([new StockRecord("S1", "P1", 10)]);
    this.stocks.insert([new StockRecord("S2", "P1", 10)]);
    this.stocks.insert([new StockRecord("S3", "P2", 11)]);
    this.stocks.insert([new StockRecord("S4", "P2", -1)]);
  }

  list(): [Error?, StockRecord[]?] {
    try {
      const res = this.stocks.find();
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

