import loki, { Collection } from 'lokijs';
import { Product } from './models';
import { IProductsDatasource } from './products_service';

class ProductsLokiDatasource implements IProductsDatasource {
  private products: Collection<Product>;

  constructor(private db: loki) {
    this.products = this.db.addCollection('products', { indices: ['code'] });
  }

  add(product: Product): [Error?, Product?] {
    const res = this.products.insert(product);
    if (!res) {
      return [new Error('Failed to add product'),];
    }
    return [, res];
  }

  list(): [Error?, Product[]?] {
    throw new Error('Method not implemented.');
  }
}

export default ProductsLokiDatasource;
