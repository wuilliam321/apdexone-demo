import { HttpClient, HttpResponse } from "./http";
import {
  IProductService,
  ListProductParams,
  ListProductResponse,
} from "./interfaces";
import { Product } from "./models";
import { Validate } from "./validations";

export class ProductService implements IProductService {
  constructor(private http: HttpClient) {}

  async create(product: Product): Promise<[Error?, string?]> {
    const [error, isValid] = Validate.createProduct(product);
    if (!isValid) {
      return [error];
    }

    const [err, res] = await this.http.post<Product, HttpResponse<Product>>(
      "/products",
      undefined,
      {
        code: product.code,
        name: product.name,
        price: product.price,
      }
    );
    if (err) {
      return [err];
    }
    if (res && res.status === 201) {
      return [undefined, res!.data.code];
    }

    return [undefined, ""];
  }

  async list(
    _params?: ListProductParams
  ): Promise<[Error?, ListProductResponse?]> {
    const [err, res] = await this.http.get<Product[], HttpResponse<Product[]>>(
      "/products",
      undefined
    );
    if (err) {
      return [err];
    }
    if (res && res.status === 201) {
      return [undefined, new ListProductResponse(res!.data)];
    }

    return [undefined, new ListProductResponse([] as Product[])];
  }
}
