import { Product } from "./models";

export class CreateProductRequest {
  constructor(public code: string, public name: string, public price: number) { }
}

export class CreateProductResponse {
  constructor(public code: string) { }
}

export class ListProductResponse {
  constructor(public products: Product[]) { }
}

export class ListProductParams {
  constructor() { }
}

export interface IProductService {
  list(params: ListProductParams): Promise<[Error?, ListProductResponse?]>;
  create(product: Product): Promise<[Error?, string?]>;
}

type Headers = { [key: string]: any };

export interface HttpClient {
  post<T, U>(uri: string, headers?: Headers, body?: T): Promise<[Error?, U?]>;
  get<T>(uri: string, headers?: Headers): Promise<[Error?, T?]>;
}
