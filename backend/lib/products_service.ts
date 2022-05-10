import { IProductsDatasource, IProductsService } from "../lib/interfaces";
import { Product } from "../lib/models";
import { CreateProductRequest, CreateProductResponse, GetProductRequest, GetProductResponse, ListProductRequest, ListProductResponse, UpdateProductRequest, UpdateProductResponse } from "../srv/models";

class ProductsService implements IProductsService {
  constructor(private productsDS: IProductsDatasource) { }

  create(req: CreateProductRequest): [Error?, CreateProductResponse?] {
    if (req.code.length === 0) {
      return [new Error("code is required"),];
    }

    if (req.name.length === 0) {
      return [new Error("name is required"),];
    }

    if (req.price <= 0) {
      return [new Error("price must be greater than 0"),];
    }

    const product = new Product(req.code, req.name, req.price);
    const [error, result] = this.productsDS.add(product);
    if (error) {
      return [error,];
    }

    const response = new CreateProductResponse(result!.code);

    return [, response];
  }

  list(_req: ListProductRequest): [Error?, ListProductResponse?] {
    const [error, products] = this.productsDS.list();
    if (error) {
      return [error,];
    }
    return [, new ListProductResponse(products!)];
  }

  get(req: GetProductRequest): [Error?, GetProductResponse?] {
    const [error, product] = this.productsDS.getByCode(req.code);
    if (error) {
      return [error,];
    }
    return [, new GetProductResponse(product!)];
  }

  update(req: UpdateProductRequest): [Error?, UpdateProductResponse?] {
    if (req.code.length === 0) {
      return [new Error("code is required"),];
    }

    if (req.name.length === 0) {
      return [new Error("name is required"),];
    }

    if (req.price <= 0) {
      return [new Error("price must be greater than 0"),];
    }

    const product = new Product(req.code, req.name, req.price);
    const [error, result] = this.productsDS.edit(product);
    if (error) {
      return [error,];
    }

    const response = new UpdateProductResponse(result!.code);

    return [, response];
  }
}

export default ProductsService;
