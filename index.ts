import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// [] health check
// Products
// [] GET /products
// [] POST /products
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
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`[server]: running at http://localhost:${port}`);
});


