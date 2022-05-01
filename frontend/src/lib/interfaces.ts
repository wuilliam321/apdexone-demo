import { Product } from "./models";

export interface IProductService {
  create(product: Product): [Error?, Product?];
}

type Headers = { [key: string]: any };
type Body = { [key: string]: any };

export interface HttpClient {
  post<T>(uri: string, headers?: Headers, body?: Body): Promise<T>;
}
