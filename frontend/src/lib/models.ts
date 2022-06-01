export class Product {
  constructor(public code: string, public name: string, public price: number) {}
}

export class StockRecord {
  constructor(
    public code: string,
    public product_code: string,
    public quantity: number,
    public category: string,
    public size: string,
    public color: string,
    public amount: number
  ) {}
}

export class Stock {
  constructor(
    public product_code: string,
    public quantity: number,
    public category: string,
    public size: string,
    public color: string,
    public amount: number
  ) {}
}
