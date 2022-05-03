import Vue from "vue";
import App from "./App.vue";
import { ListProductResponse, ServiceInjection } from "./lib/interfaces";
import { Product } from "./lib/models";
import { ProductService } from "./lib/product_service";
import router from "./router";

Vue.config.productionTip = false;

const httpMock = {
  post: (): Promise<any> => Promise.resolve([undefined, { code: "123" }]),
  get: (): Promise<any> => {
    const res = new ListProductResponse([new Product("123", "test", 1000)]);
    return Promise.resolve([undefined, res]);
  },
};

const productService = new ProductService(httpMock);

new Vue({
  router,
  provide(): ServiceInjection {
    return { productService };
  },
  render: (h) => h(App),
}).$mount("#app");
