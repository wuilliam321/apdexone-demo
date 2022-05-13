import { Request, Response } from 'express';
import { IProductsService } from '../lib/interfaces';
import { CreateProductRequest, DeleteProductRequest, GetProductRequest, ListProductRequest, UpdateProductRequest } from './models';

class HttpServer {
  constructor(private productsService: IProductsService) { }

  handleCreateProduct(): (req: Request, res: Response) => void {
    return (req: Request, res: Response) => {
      if (!req.body) {
        res.status(400).send({ message: 'body is required' });
        return;
      }

      if (!req.body.code) {
        res.status(400).send({ message: 'code is required' });
        return;
      }

      if (!req.body.name) {
        res.status(400).send({ message: 'name is required'});
        return;
      }

      if (!req.body.price || req.body.price <= 0) {
        res.status(400).send({ message:'price is required'});
        return;
      }

      const body = new CreateProductRequest(req.body.code, req.body.name, req.body.price);

      const [error, result] = this.productsService.create(body);
      if (error) {
        res.status(500).send({ message: error.message });
        return;
      }

      res.status(201).send(result);
    }
  }

  handleListProducts(): (req: Request, res: Response) => void {
    return (_req: Request, res: Response) => {
      const body = new ListProductRequest();
      const [error, result] = this.productsService.list(body);
      if (error) {
        res.status(500).send({ message: error.message });
        return;
      }
      res.status(201).send(result!.products);
    }
  };

  handleGetProduct(): (req: Request, res: Response) => void {
    return (req: Request, res: Response) => {
      const body = new GetProductRequest(req.params.id);
      const [error, result] = this.productsService.get(body);
      if (error) {
        res.status(500).send({ message: error.message });
        return;
      }
      res.status(201).send(result!.product);
    }
  };

  handleUpdateProduct(): (req: Request, res: Response) => void {
    return (req: Request, res: Response) => {
      if (!req.body) {
        res.status(400).send({ message: 'body is required' });
        return;
      }

      if (!req.body.code) {
        res.status(400).send({ message: 'code is required'});
        return;
      }

      if (!req.body.name) {
        res.status(400).send({ message:'name is required'});
        return;
      }

      if (!req.body.price || req.body.price <= 0) {
        res.status(400).send({ message:'price is required'});
        return;
      }

      const body = new UpdateProductRequest(req.body.code, req.body.name, req.body.price);

      const [error, result] = this.productsService.update(body);
      if (error) {
        res.status(500).send({ message: error.message });
        return;
      }

      res.status(201).send(result);
    }
  }

  handleDeleteProduct(): (req: Request, res: Response) => void {
    return (req: Request, res: Response) => {
      if (!req.params.id || req.params.id === '') {
        res.status(400).send({ message: 'code is required'});
        return;
      }

      const body = new DeleteProductRequest(req.params.id);

      const [error, result] = this.productsService.delete(body);
      if (error) {
        res.status(500).send({ message: error.message });
        return;
      }

      res.status(201).send(result);
    }
  }
}

export default HttpServer;
