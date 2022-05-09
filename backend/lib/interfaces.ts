import { Product } from "./models";
import {
  CreateProductRequest,
  CreateProductResponse,
  GetProductRequest,
  GetProductResponse,
  ListProductRequest,
  ListProductResponse,
} from "../srv/models";

export interface IProductsDatasource {
  add(product: Product): [Error?, Product?];
  list(): [Error?, Product[]?];
  getByCode(code: string): [Error?, Product?];
}

export interface IProductsService {
  create(req: CreateProductRequest): [Error?, CreateProductResponse?];
  list(req: ListProductRequest): [Error?, ListProductResponse?];
  get(req: GetProductRequest): [Error?, GetProductResponse?];
}
