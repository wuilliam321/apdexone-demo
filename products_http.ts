import { Request, Response } from 'express';
import ProductsService, { CreateProductRequest } from './products_service';

class ProductsHttp {
  constructor(private productsService: ProductsService) {}

  handleCreateProduct(req: Request, res: Response) {
    if (!req.body) {
      res.send("body is required");
      return;
    }

    const body: CreateProductRequest = {
        name: req.body.name,
        price: req.body.price,
    }

    const [result, error] = this.productsService.create(body);
    if (error) {
      res.send(error);
      return;
    }

    res.send(result);
  }
}

export default ProductsHttp;
