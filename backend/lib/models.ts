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
