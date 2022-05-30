import Vue from "vue";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App.vue";
import { AxiosClient } from "./infra/axios_client";
import { ServiceInjection } from "./lib/interfaces";
import { ProductService } from "./lib/product_service";
import router from "./router";
import { StockService } from "./lib/stock_service";

Vue.config.productionTip = false;

const httpClient = new AxiosClient();

const productService = new ProductService(httpClient);
const stockService = new StockService(httpClient);

new Vue({
  router,
  provide(): ServiceInjection {
    return {
      productService,
      stockService,
    };
  },
  render: (h) => h(App),
}).$mount("#app");
