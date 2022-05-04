import Loki from 'lokijs';
import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import HttpServer from './srv/http';
import ProductsService from './lib/products_service';
import LokiDatasource from './infra/loki_datasource';
import routes from './routes';

dotenv.config();

const db = new Loki('inventoryDB');
const ds = new LokiDatasource(db);
const service = new ProductsService(ds);
const server = new HttpServer(service);

const app: Express = express();
app.use(express.json())
app.use(cors())

routes(app, server);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`[server]: running at http://localhost:${port}`);
});


