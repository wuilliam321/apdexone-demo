import Loki, { Collection } from 'lokijs';
import { Product } from '../lib/models';
import { IProductsDatasource } from '../lib/interfaces';

class ProductsLokiDatasource implements IProductsDatasource {
  private products: Collection<Product>;

  constructor(private db: Loki) {
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
    const res = this.products.find();
    return [, res];
  }

  getByCode(code: string): [Error?, Product?] {
    const res = this.products.findOne({ code });
    if (!res) {
      return [new Error(`Failed to get product by code ${code}`),];
    }
    return [, res];
  }
}

export default ProductsLokiDatasource;
