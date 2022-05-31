import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Express, Request, Response } from 'express';
import HttpServer from './srv/http';

function routes(app: Express, server: HttpServer) {
  /**
   * Products
   */

  /**
   * @openapi
   *   components:
   *     schemas:
   *       Product:
   *         type: object
   *         properties:
   *           code:
   *             type: string
   *           name:
   *             type: string
   *           price:
   *             type: number
   *       StockRecord:
   *         type: object
   *         properties:
   *           code:
   *             type: string
   *           product_code:
   *             type: string
   *           quantity:
   *             type: number
   *           category:
   *             type: string
   *       Stock:
   *         type: object
   *         properties:
   *           product_code:
   *             type: string
   *           quantity:
   *             type: number
   *           category:
   *             type: string
   *       Error:
   *         type: object
   *         properties:
   *           message:
   *             type: string
   *       CreateProductResponse:
   *         type: object
   *         properties:
   *           code:
   *             type: string
   *       UpdateProductResponse:
   *         type: object
   *         properties:
   *           code:
   *             type: string
   *       DeleteProductResponse:
   *         type: object
   *         properties:
   *           code:
   *             type: string
   */

  /**
   * @openapi
   * /:
   *   get:
   *     summary: Service health check
   *     responses:
   *       200:
   *         description: Returns backend version
   */
  app.get('/', (_req: Request, res: Response) => {
    res.status(200).send('v1.0.0');
  });

  /**
   * @openapi
   * /products/{id}:
   *   get:
   *     summary: Get product by id
   *     parameters:
   *       - name: id
   *         in: path
   *         description: id of the product
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       201:
   *         description: successful operation
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  app.get('/products/:id', server.handleGetProduct());

  /**
   * @openapi
   * /products/{id}:
   *   put:
   *     summary: Update a product by a given id
   *     parameters:
   *       - name: id
   *         in: path
   *         description: id of the product
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       201:
   *         description: successful operation
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UpdateProductResponse'
   *       400:
   *         description: User input errors
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Product'
   *       description: Updated product object
   *       required: true
   */
  app.put('/products/:id', server.handleUpdateProduct());

  /**
   * @openapi
   * /products:
   *   get:
   *     summary: List all products
   *     responses:
   *       201:
   *         description: successful operation
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Product'
   *       500:
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  app.get('/products', server.handleListProducts());

  /**
   * @openapi
   * /products:
   *   post:
   *     summary: Creates a product
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Product'
   *     responses:
   *       201:
   *         description: successful operation
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CreateProductResponse'
   *       400:
   *         description: User input errors
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  app.post('/products', server.handleCreateProduct());

  /**
   * @openapi
   * /products/{id}:
   *   delete:
   *     summary: Delete a product by a given id
   *     parameters:
   *       - name: id
   *         in: path
   *         description: id of the product
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       201:
   *         description: successful operation
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/DeleteProductResponse'
   *       400:
   *         description: User input errors
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  app.delete('/products/:id', server.handleDeleteProduct());

  /**
    * Inventory
    */


  /**
   * @openapi
   * /stock:
   *   get:
   *     summary: Full record of the stock
   *     responses:
   *       201:
   *         description: successful operation
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/StockRecord'
   *       500:
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  app.get('/stock', server.handleListStock());

  /**
   * @openapi
   * /stock:
   *   post:
   *     summary: Creates a stock record
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/StockRecord'
   *     responses:
   *       201:
   *         description: successful operation
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CreateStockRecordResponse'
   *       400:
   *         description: User input errors
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  app.post('/stock', server.handleCreateStockRecord());


  /**
   * @openapi
   * /stock/report:
   *   get:
   *     summary: Report of the stock
   *     parameters:
   *        - in: query
   *          name: groupBy
   *          schema:
   *            type: string
   *          description: Group the report by this field
   *     responses:
   *       201:
   *         description: successful operation
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Stock'
   *       500:
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  app.get('/stock/report', server.handleReportStock());

  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Hello World',
        version: '1.0.0',
      },
    },
    apis: ['./routes*.ts'], // files containing annotations as above
  };
  const swaggerSpec = swaggerJSDoc(options);

  var options2 = {
    swaggerOptions: {
      url: "/docs/swagger.json",
    },
  }
  app.get("/docs/swagger.json", (_req, res) => res.json(swaggerSpec));
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, options2));
}

export default routes;
