import { Product, Stock, StockRecord } from "./models";

// TODO: vue related
export interface ServiceInjection {
  productService?: IProductService;
  stockService?: IStockService;
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
  update(product: Product): Promise<[Error?, string?]>;
  get(productId: string): Promise<[Error?, Product?]>;
  delete(productId: string): Promise<[Error?, string?]>;
}

export class ListStockParams {}

export class ListStockResponse {
  constructor(public records: StockRecord[]) {}
}

export type GroupByReportStock = "product_code" | "category" | "size" | "color";

export class ReportStockParams {
  constructor(public groupBy?: GroupByReportStock) {}
}

export class ReportStockResponse {
  constructor(public stocks: Stock[]) {}
}

export interface IStockService {
  list(params?: ListStockParams): Promise<[Error?, ListStockResponse?]>;
  report(params?: ReportStockParams): Promise<[Error?, ReportStockResponse?]>;
  create(stockRecord: StockRecord): Promise<[Error?, string?]>;
}
