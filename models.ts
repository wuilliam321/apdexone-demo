export class Product {
  constructor(private _code: string, private _name: string, private _price: number) {}

  toJSON(): Object {
    return {
      code: this._code,
      name: this._name,
      price: this._price
    };
  }

  get code(): string {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }
}

