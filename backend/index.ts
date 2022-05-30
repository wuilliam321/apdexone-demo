import Loki from 'lokijs';
import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import HttpServer from './srv/http';
import ProductsService from './lib/products_service';
import StockService from './lib/stock_service';
import ProductsDatasource from './infra/products_datasource';
import StockDatasource from './infra/stock_datasource';
import routes from './routes';

dotenv.config();

const db = new Loki('inventoryDB');

const productsDs = new ProductsDatasource(db);
const productsService = new ProductsService(productsDs);

const stocksDS = new StockDatasource(db);
const stockService = new StockService(stocksDS);

const server = new HttpServer(productsService, stockService);

const app: Express = express();
app.use(express.json())
app.use(cors())

routes(app, server);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`[server]: running at http://localhost:${port}`);
});
