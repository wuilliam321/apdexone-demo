import Loki, { Collection } from 'lokijs';
import { Stock } from '../lib/models';
import { IStockDatasource } from '../lib/interfaces';

class StocksLokiDatasource implements IStockDatasource {
  private stocks: Collection<Stock>;

  constructor(private db: Loki) {
    this.stocks = this.db.addCollection('stocks', {
      indices: ['code'],
      unique: ['code'],
    });
    this.stocks.insert([new Stock("S1", "P1", 10)]);
    this.stocks.insert([new Stock("S2", "P2", 11)]);
  }

  list(): [Error?, Stock[]?] {
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

