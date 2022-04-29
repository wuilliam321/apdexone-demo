import { Product } from './models';
import { IProductsDatasource } from './products_service';

class ProductsDatasource implements IProductsDatasource {
  constructor() {
  }

  add(product: Product): [Error?, Product?] {
    return [,product];
  }
}

export default ProductsDatasource;
