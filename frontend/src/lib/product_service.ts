import { AxiosResponse } from "axios";
import {
  CreateProductRequest,
  CreateProductResponse,
  HttpClient,
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

    const [err, res] = await this.http.post<
      CreateProductRequest,
      CreateProductResponse
    >("/products", undefined, {
      code: product.code,
      name: product.name,
      price: product.price,
    });
    if (err) {
      return [err];
    }

    return [undefined, res!.code];
  }

  async list(
    _params?: ListProductParams
  ): Promise<[Error?, ListProductResponse?]> {
    const [err, res] = await this.http.get<AxiosResponse<Product[], any>>(
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
