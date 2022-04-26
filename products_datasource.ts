import { Product } from './models';
import { IProductsDatasource } from './products_service';

class ProductsDatasource implements IProductsDatasource {
  productCounter = 0;
  constructor() {
  }

  add(product: Product): [Error?, Product?] {
    this.productCounter++;
    return [,{
      id: this.productCounter,
      name: product.name,
      price: product.price,
    }];
  }
}

export default ProductsDatasource;
