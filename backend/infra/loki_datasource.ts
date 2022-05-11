import Loki, { Collection } from 'lokijs';
import { Product } from '../lib/models';
import { IProductsDatasource } from '../lib/interfaces';

class ProductsLokiDatasource implements IProductsDatasource {
  private products: Collection<Product>;

  constructor(private db: Loki) {
    this.products = this.db.addCollection('products', {
      indices: ['code'],
      unique: ['code'],
    });
  }

  add(product: Product): [Error?, Product?] {
    try {
      const res = this.products.insert(product);
      if (!res) {
        return [new Error('Failed to add product'),];
      }
      return [, res];
    } catch (e) {
      return [this.handleError(e as Error),];
    }
  }

  list(): [Error?, Product[]?] {
    try {
      const res = this.products.find();
      return [, res];
    } catch (e) {
      return [this.handleError(e as Error),];
    }
  }

  getByCode(code: string): [Error?, Product?] {
    try {
      const res = this.products.findOne({ code });
      if (!res) {
        return [new Error(`Failed to get product by code ${code}`),];
      }
      return [, res];
    } catch (e) {
      return [this.handleError(e as Error),];
    }
  }

  edit(product: Product): [Error?, Product?] {
    try {
      const p = this.products.by('code', product.code);
      if (!p) {
        return [new Error('Failed to get product for update'),];
      }
      p.name = product.name;
      p.price = product.price;
      const res = this.products.update(p);
      if (!res) {
        return [new Error('Failed to update product'),];
      }
      return [, res];
    } catch (e) {
      return [this.handleError(e as Error),];
    }
  }

  delete(code: string): [Error?, string?] {
    try {
      const p = this.products.by('code', code);
      if (!p) {
        return [new Error('Failed to get product for delete'),];
      }
      const res = this.products.remove(p);
      if (!res) {
        return [new Error('Failed to delete product'),];
      }
      return [, res.code];
    } catch (e) {
      return [this.handleError(e as Error),];
    }
  }

  handleError(e: Error): Error {
    const message = e instanceof Error ? e.message : "Unknown error";
    return new Error(message);
  }
}

export default ProductsLokiDatasource;
