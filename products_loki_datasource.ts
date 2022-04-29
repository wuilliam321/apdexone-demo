import { Product } from './models';
import { IProductsDatasource } from './products_service';

class ProductsLokiDatasource implements IProductsDatasource {
  constructor() {
  }

  add(product: Product): [Error?, Product?] {
    const id = 1;
    return [,{
      id: id,
      name: product.name,
      price: product.price,
    }];
  }
}

export default ProductsLokiDatasource;
