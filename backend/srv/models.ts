import { Product, Stock, StockRecord } from "../lib/models";

export class CreateProductResponse {
  constructor(private _code: string) { }

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

export class GetProductRequest {
  constructor(public code: string) { }
}

export class GetProductResponse {
  constructor(public product: Product) { }
}

export class ListProductRequest { }
export class ListProductResponse {
  constructor(private _products: Product[]) { }

  toJSON(): Object {
    return {
      products: this._products,
    };
  }

  get products(): Product[] {
    return this._products;
  }
}

export class UpdateProductResponse {
  constructor(public code: string) { }
}

export class UpdateProductRequest {
  constructor(public code: string, public name: string, public price: number) { }
}

export class DeleteProductRequest {
  constructor(public code: string) { }
}

export class DeleteProductResponse {
  constructor(public code: string) { }
}


export class ListStockRequest { }
export class ListStockResponse {
  constructor(private _stocks: Stock[]) { }

  toJSON(): Object {
    return {
      stocks: this._stocks,
    };
  }

  get stocks(): Stock[] {
    return this._stocks;
  }
}

type ProductQuantities = {
    [key: string]: number[];
}

export class ReportStockRequest { }
export class ReportStockResponse {
  private _stock: Stock[];

  constructor(private _records: StockRecord[]) {
    this._stock = [] as Stock[];
  }

  toJSON(): Object {
    return {
      stock: this._stock,
    };
  }

  get records(): Stock[] {
    let quantities: ProductQuantities = {};
    if (this._records.length > 0) {
      this._records.forEach(record => {
        if (!quantities[record.product_code]) {
          quantities[record.product_code] = [] as number[];
        }
        quantities[record.product_code].push(record.quantity);
      });
      Object.entries(quantities).forEach(([productCode, quantities]) => {
        this._stock.push(new Stock(productCode, quantities.reduce((a, b) => a + b, 0)));
      });
    }
    return this._stock;
  }
}
