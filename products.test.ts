// Models
class Product {
  name: string;
  price: number;
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

class CreateProductResponse {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}

class CreateProductRequest {
  constructor(product: Product) {
  }
}

function create(req: CreateProductRequest): CreateProductResponse {
  return {
    id: 1,
  };
}

describe("Products", () => {
  test("create", () => {
    // Create product API
    const product = new Product("iPhone", 1000);
    const req = new CreateProductRequest(product);
    const res = create(req);
    expect(res.id).toBe(1);
  });
});
