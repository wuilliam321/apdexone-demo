import { Product } from './models';
import { IProductsDatasource } from './products_service';

class ProductsDatasource implements IProductsDatasource {
  productCounter = 0;
  constructor() {
  }

  add(product: Product): [Product?, Error?] {
    this.productCounter++;
    return [{
      id: this.productCounter,
      name: product.name,
      price: product.price,
    }, undefined];
  }
}

export default ProductsDatasource;
