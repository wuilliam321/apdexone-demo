import { Product, Stock } from "../lib/models";
import { IProductsDatasource, IStockDatasource } from "../lib/interfaces";

export class ProductDatasourceMock implements IProductsDatasource {
  constructor() {}

  add(product: Product): [Error?, Product?] {
    return [,product];
  }

  list(): [Error?, Product[]?] {
    return [, [] as Product[]];
  }

  getByCode(code: string): [Error?, Product?] {
    return [, new Product(code, "iPhone", 1000)];
  }

  edit(product: Product): [Error?, Product?] {
    return [,product];
  }

  delete(code: string): [Error?, string?] {
    return [, code];
  }
}

export class StockDatasourceMock implements IStockDatasource {
  constructor() {}

  list(): [Error?, Stock[]?] {
    return [, [] as Stock[]];
  }
}
