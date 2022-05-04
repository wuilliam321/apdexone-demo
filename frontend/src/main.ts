import Vue from "vue";
import App from "./App.vue";
import { AxiosClient } from "./infra/http_client";
import { ServiceInjection } from "./lib/interfaces";
import { ProductService } from "./lib/product_service";
import router from "./router";

Vue.config.productionTip = false;

const httpClient = new AxiosClient();

const productService = new ProductService(httpClient);

new Vue({
  router,
  provide(): ServiceInjection {
    return { productService };
  },
  render: (h) => h(App),
}).$mount("#app");
