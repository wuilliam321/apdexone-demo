import { Product } from './models';

export class CreateProductResponse {
  constructor(private _code: string) {}

  get code(): string {
    return this._code;
  }

  toJSON(): Object {
    return {
      code: this._code,
    };
  }
}

export class CreateProductRequest {
  constructor(private _code: string, private _name: string, private _price: number) {
  }

  get name(): string {
    return this._name;
  }

  get code(): string {
    return this._code;
  }

  get price(): number {
    return this._price;
  }
}

export interface IProductsDatasource {
  add(product: Product): [Error?, Product?]
}

export interface IProductsService {
  create(req: CreateProductRequest): [Error?, CreateProductResponse?]
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
}

export default ProductsService;
