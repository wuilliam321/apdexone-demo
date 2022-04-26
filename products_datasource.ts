import { Product } from './models';

class ProductsDatasource {
  productCounter = 0;
  constructor() {
  }

  add(product: Product): Product {
    this.productCounter++;
    return {
      id: this.productCounter,
      name: product.name,
      price: product.price,
    };
  }
}

export default ProductsDatasource;
