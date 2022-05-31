import { Product, StockRecord } from "./models";

export class Validate {
  static saveProduct(product: Product): [Error?, boolean?] {
    if (!product.code.length) {
      return [new Error("code is required"), false];
    }
    if (!product.name.length) {
      return [new Error("name is required"), false];
    }
    if (product.price <= 0) {
      return [new Error("price is required and greater than 0"), false];
    }
    return [undefined, true];
  }

  static saveStockRecord(stockRecord: StockRecord): [Error?, boolean?] {
    if (!stockRecord.code.length) {
      return [new Error("code is required"), false];
    }
    if (!stockRecord.product_code.length) {
      return [new Error("product_code is required"), false];
    }
    if (stockRecord.quantity === 0) {
      return [new Error("quantity is required and greater than 0"), false];
    }
    return [undefined, true];
  }
}
