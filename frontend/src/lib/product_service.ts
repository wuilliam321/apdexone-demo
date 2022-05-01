import { HttpClient, IProductService } from "./interfaces";
import { Product } from "./models";
import { Validate } from "./validations";

export class ProductService implements IProductService {
  constructor(private http: HttpClient) {}
  // TODO: here is where async await would be used
  create(product: Product): [Error?, Product?] {
    const [error, isValid] = Validate.createProduct(product);
    if (!isValid) {
      return [error,];
    }

    const body = {
      code: product.code,
      name: product.name,
      price: product.price,
    }
    this.http.post("/products", undefined, body);
    return [, product];
  }
}


