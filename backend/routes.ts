import { Express, Request, Response } from 'express';
import HttpServer from './srv/http';

function routes(app: Express, server: HttpServer) {

// [] health check
// Products
// [X] GET /products
// [X] POST /products
// [] PUT /products/:id
// [] PATCH /products/:id
// [] DELETE /products/:id
//
// Inventory
// [] GET /inventory/:productId
// [] PATCH /products/:id
//
// Orders
// [] GET /orders
// [] POST /orders
// [] PUT /orders/:id
// [] PATCH /orders/:id
// [] DELETE /orders/:id
app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/products/:id', server.handleGetProduct());
app.get('/products', server.handleListProducts());
app.post('/products', server.handleCreateProduct());
}

export default routes;
