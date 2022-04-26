import { Product } from './models';

export class CreateProductResponse {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}

export class CreateProductRequest {
  name: string;
  price: number;
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

export interface IProductsDatasource {
  add(product: Product): Product
}

export interface IProductsService {
  create(req: CreateProductRequest): [CreateProductResponse?, Error?]
}

class ProductsService implements IProductsService {
  constructor(private productsDS: IProductsDatasource) {
  }

  create(req: CreateProductRequest): [CreateProductResponse?, Error?] {
    if (req.name.length === 0) {
      return [undefined, new Error("name is required")];
    }

    if (req.price <= 0) {
      return [undefined, new Error("price must be greater than 0")];
    }

    const product = new Product(0, req.name, req.price);
    // TODO: what if there is an error
    const result = this.productsDS.add(product);
    const response = { id: result.id, };

    return [ response, undefined];
  }
}

export default ProductsService;
