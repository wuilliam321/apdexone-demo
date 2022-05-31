import { Stock, StockRecord } from '../lib/models';
import { ReportStockOptions, ReportStockResponse } from './models';

describe('ReportStockResponse reports', () => {
  let stockRecords: StockRecord[];
  let expected: Stock[];
  let options: ReportStockOptions;

  beforeEach(() => {
    stockRecords = [];
    expected = [];
    options = {};
  });

  test('given an empty stock records list, should return an empty stock records', () => {
    let res = new ReportStockResponse(stockRecords);
    expect(res.records).toEqual(expected);
  });

  test('given a single record, should return one single stock record', () => {
    stockRecords = [
      new StockRecord('1', 'P1', 1, "CAT", "L"),
    ];
    expected = [
      new Stock('P1', 1, "*", "*"),
    ];
    let res = new ReportStockResponse(stockRecords);
    expect(res.records).toEqual(expected);
  });

  test('given two records of same product, should return one single stock record', () => {
    stockRecords = [
      new StockRecord('1', 'P1', 1, "CAT", "L"),
      new StockRecord('2', 'P1', 2, "CAT", "L"),
    ];
    expected = [
      new Stock('P1', 3, "*", "*"),
    ];
    let res = new ReportStockResponse(stockRecords);
    expect(res.records).toEqual(expected);
  });

  test('given multiple records of different products (group by category), should return two stock records', () => {
    stockRecords = [
      new StockRecord('1', 'P1', 1, "CAT", "L"),
      new StockRecord('2', 'P1', 2, "CAT", "L"),
      new StockRecord('3', 'P2', 1, "CAT", "L"),
      new StockRecord('4', 'P2', 2, "CAT", "L"),
    ];
    options = {
      groupBy: {
        category: true,
      },
    };
    expected = [
      new Stock('*', 6, "CAT", "*"),
    ];
    let res = new ReportStockResponse(stockRecords, options);
    expect(res.records).toEqual(expected);
  });

  test('given multiple records of different products (group by size), should return two stock records', () => {
    stockRecords = [
      new StockRecord('1', 'P1', 1, "CAT", "L"),
      new StockRecord('2', 'P1', 2, "CAT", "L"),
      new StockRecord('3', 'P2', 1, "CAT", "M"),
      new StockRecord('4', 'P2', 2, "CAT", "M"),
    ];
    options = {
      groupBy: {
        size: true,
      },
    };
    expected = [
      new Stock('*', 3, "*", "L"),
      new Stock('*', 3, "*", "M"),
    ];
    let res = new ReportStockResponse(stockRecords, options);
    expect(res.records).toEqual(expected);
  });
});
