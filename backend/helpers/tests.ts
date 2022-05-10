import { Product } from "../lib/models";
import { IProductsDatasource } from "../lib/interfaces";

export class DatasourceMock implements IProductsDatasource {
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

}
