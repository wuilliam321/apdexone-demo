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

type stockParserCallback = (value: [string, number[]], index: number, array: [string, number[]][]) => Stock;

class ProductQuantities {
  constructor(public records: StockRecord[]) { }

  groupBy(fieldKey: keyof StockRecord, stockParserFn: stockParserCallback) {
    let quantities: { [key: string]: number[] } = {};
    for (let i = 0; i < this.records.length; i++) {
      let stockRecord = this.records[i];
      if (!quantities[`${stockRecord[fieldKey]}`]) {
        quantities[`${stockRecord[fieldKey]}`] = [] as number[];
      }
      quantities[`${stockRecord[fieldKey]}`].push(stockRecord.quantity);
    }
    return Object.entries(quantities).map(stockParserFn);
  }
}

export type ReportStockOptions = {
  groupBy?: {
    product_code?: boolean;
    category?: boolean;
    size?: boolean;
    color?: boolean;
  },
}

export type GroupByReportStock = "product_code" | "category" | "size" | "color";

export class ReportStockRequest {
  constructor(public groupBy?: GroupByReportStock) { }
}
export class ReportStockResponse {
  private _quantities: ProductQuantities;

  constructor(private _records: StockRecord[], private _options?: ReportStockOptions) {
    this._quantities = new ProductQuantities(this._records);
  }

  // TODO: we need to make it parameterized because we need to group, and a lot of things
  get records(): Stock[] {
    if (this.hasGroupBy()) {
      const groupEntries = Object.entries(this._options!.groupBy!);
      for (let i = 0; i < groupEntries.length; i++) {
        const [field, enabled] = groupEntries[i];
        if (field === 'product_code' && enabled) {
          return this.byProductCode();
        }
        if (field === 'category' && enabled) {
          return this.byCategory();
        }
        if (field === 'size' && enabled) {
          return this.bySize();
        }
        if (field === 'color' && enabled) {
          return this.byColor();
        }
        // TODO: add more groupings
      }
    }

    return this.byProductCode();
  }

  private sum(quantities: number[]): number {
    return quantities.reduce((a, b,) => a + b, 0);
  }

  private hasGroupBy(): boolean {
    return !!(this._records.length > 0 && this._options && this._options.groupBy);
  }

  private byProductCode(): Stock[] {
    return this._quantities.groupBy("product_code", ([productCode, quantities]): Stock => (
      new Stock(productCode, this.sum(quantities), "*", "*", "*")
    ));
  }

  private byCategory(): Stock[] {
    return this._quantities.groupBy("category", ([categoryField, quantities]): Stock => {
      return new Stock('*', this.sum(quantities), categoryField, "*", "*")
    });
  }

  private bySize(): Stock[] {
    return this._quantities.groupBy("size", ([sizeField, quantities]): Stock => {
      return new Stock('*', this.sum(quantities), "*", sizeField, "*")
    });
  }

  private byColor(): Stock[] {
    return this._quantities.groupBy("color", ([colorField, quantities]): Stock => {
      return new Stock('*', this.sum(quantities), "*", "*", colorField)
    });
  }
}

export class CreateStockRecordResponse {
  constructor(public product_code: string) { }

  toJSON(): Object {
    return {
      product_code: this.product_code,
    };
  }
}

export class CreateStockRecordRequest {
  constructor(
    public code: string,
    public product_code: string,
    public quantity: number,
    public category: string,
    public size: string,
    public color: string,
    public amount: number,
  ) { }

  toJSON(): Object {
    return {
      product_code: this.product_code,
      quantity: this.quantity,
      category: this.category,
      size: this.size,
      color: this.color,
      amount: this.amount,
    };
  }
}
