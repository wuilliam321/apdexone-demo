export class Product {
  constructor(public code: string, public name: string, public price: number) { }

  toJSON(): Object {
    return {
      code: this.code,
      name: this.name,
      price: this.price,
    };
  }
}

export class Stock {
  constructor(
    public product_code: string,
    public quantity: number,
    public category: string,
    public size: string,
    public color: string
  ) { }

  toJSON(): Object {
    return {
      product_code: this.product_code,
      quantity: this.quantity,
      category: this.category,
      size: this.size,
      color: this.color,
    };
  }
}

export class StockRecord {
  constructor(
    public code: string,
    public product_code: string,
    public quantity: number,
    public category: string,
    public size: string,
    public color: string
  ) { }

  toJSON(): Object {
    return {
      code: this.code,
      product_code: this.product_code,
      quantity: this.quantity,
      category: this.category,
      size: this.size,
      color: this.color,
    };
  }
}
