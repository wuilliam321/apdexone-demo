import { Product } from "./models";

// TODO: vue related
export interface ServiceInjection {
  productService: IProductService;
}

export class CreateProductRequest {
  constructor(public code: string, public name: string, public price: number) {}
}

export class CreateProductResponse {
  constructor(public code: string) {}
}

export class ListProductResponse {
  constructor(public products: Product[]) {}
}

export class ListProductParams {}

export interface IProductService {
  list(params?: ListProductParams): Promise<[Error?, ListProductResponse?]>;
  create(product: Product): Promise<[Error?, string?]>;
}
