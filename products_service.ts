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
  add(product: Product): [Error?, Product?]
}

export interface IProductsService {
  create(req: CreateProductRequest): [Error?, CreateProductResponse?]
}

class ProductsService implements IProductsService {
  constructor(private productsDS: IProductsDatasource) {
  }

  create(req: CreateProductRequest): [Error?, CreateProductResponse?] {
    if (req.name.length === 0) {
      return [new Error("name is required"),];
    }

    if (req.price <= 0) {
      return [new Error("price must be greater than 0"), ];
    }

    const product = new Product(0, req.name, req.price);
    const [error, result] = this.productsDS.add(product);
    if (error) {
      return [error,];
    }

    const response = { id: result!.id, };

    return [, response];
  }
}

export default ProductsService;
