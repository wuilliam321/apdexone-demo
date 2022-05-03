import { Product } from "./models";

export class Validate {
  static createProduct(product: Product): [Error?, boolean?] {
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
}
