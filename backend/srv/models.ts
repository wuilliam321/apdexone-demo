import { Product } from "../lib/models";

export class CreateProductResponse {
  constructor(private _code: string) { }

  toJSON(): Object {
    return {
      code: this._code,
    };
  }

  get code(): string {
    return this._code;
  }
}

export class CreateProductRequest {
  constructor(private _code: string, private _name: string, private _price: number) {
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get code(): string {
    return this._code;
  }

  set code(code: string) {
    this._code = code;
  }

  get price(): number {
    return this._price;
  }

  set price(price: number) {
    this._price = price;
  }
}

export class GetProductRequest {
  constructor(public code: string) { }
}

export class GetProductResponse {
  constructor(public product: Product) { }
}

export class ListProductRequest { }
export class ListProductResponse {
  constructor(private _products: Product[]) { }

  toJSON(): Object {
    return {
      products: this._products,
    };
  }

  get products(): Product[] {
    return this._products;
  }
}

export class UpdateProductResponse {
  constructor(public code: string) { }
}

export class UpdateProductRequest {
  constructor(public code: string, public name: string, public price: number) { }
}

export class DeleteProductRequest {
  constructor(public code: string) { }
}

export class DeleteProductResponse {
  constructor(public code: string) { }
}
