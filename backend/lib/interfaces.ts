import { Product, Stock } from "./models";
import {
  CreateProductRequest,
  CreateProductResponse,
  DeleteProductRequest,
  DeleteProductResponse,
  GetProductRequest,
  GetProductResponse,
  ListProductRequest,
  ListProductResponse,
  ListStockRequest,
  ListStockResponse,
  UpdateProductRequest,
  UpdateProductResponse,
} from "../srv/models";

export interface IProductsDatasource {
  add(product: Product): [Error?, Product?];
  edit(product: Product): [Error?, Product?];
  list(): [Error?, Product[]?];
  getByCode(code: string): [Error?, Product?];
  delete(code: string): [Error?, string?];
}

export interface IProductsService {
  create(req: CreateProductRequest): [Error?, CreateProductResponse?];
  list(req: ListProductRequest): [Error?, ListProductResponse?];
  get(req: GetProductRequest): [Error?, GetProductResponse?];
  update(req: UpdateProductRequest): [Error?, UpdateProductResponse?];
  delete(req: DeleteProductRequest): [Error?, DeleteProductResponse?];
}


export interface IStockDatasource {
  list(): [Error?, Stock[]?];
}

export interface IStockService {
  list(req: ListStockRequest): [Error?, ListStockResponse?];
}
