import { Product } from './models';

export class CreateProductResponse {
  constructor(private _code: string) {}

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

export class ListProductRequest {}
export class ListProductResponse {
  constructor(private _products: Product[]) {}

  toJSON(): Object {
    return {
      products: this._products,
    };
  }

  get products(): Product[] {
    return this._products;
  }
}

export interface IProductsDatasource {
  add(product: Product): [Error?, Product?]
  list(): [Error?, Product[]?]
}

export interface IProductsService {
  create(req: CreateProductRequest): [Error?, CreateProductResponse?]
  list(req: ListProductRequest): [Error?, ListProductResponse?]
}

class ProductsService implements IProductsService {
  constructor(private productsDS: IProductsDatasource) {}

  create(req: CreateProductRequest): [Error?, CreateProductResponse?] {
    if (req.code.length === 0) {
      return [new Error("code is required"),];
    }

    if (req.name.length === 0) {
      return [new Error("name is required"),];
    }

    if (req.price <= 0) {
      return [new Error("price must be greater than 0"), ];
    }

    const product = new Product(req.code, req.name, req.price);
    const [error, result] = this.productsDS.add(product);
    if (error) {
      return [error,];
    }

    const response = new CreateProductResponse(result!.code);

    return [, response];
  }

  list(_req: ListProductRequest): [Error?, ListProductResponse?] {
    const [error, products]= this.productsDS.list();
    if (error) {
      return [error,];
    }
    return [, new ListProductResponse(products!)];
  }
}

export default ProductsService;
