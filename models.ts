export class Product {
  constructor(private _code: string, private _name: string, private _price: number) {
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

