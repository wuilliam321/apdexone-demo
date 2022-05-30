import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import ProductListView from "../views/ProductListView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: ProductListView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },

  /**
   * Inventory::products
   **/
  {
    path: "/inventory",
    redirect: "/inventory/products",
  },
  {
    path: "/inventory/stock",
    name: "stock.report",
    component: () => import("../views/StockView.vue"),
  },
  {
    path: "/inventory/products",
    name: "products.list",
    component: () => import("../views/ProductListView.vue"),
  },
  {
    path: "/inventory/products/add",
    name: "products.add",
    component: () => import("../views/ProductAddView.vue"),
  },
  {
    path: "/inventory/products/:id",
    name: "products.edit",
    component: () => import("../views/ProductEditView.vue"),
  },
  {
    path: "/inventory/products/:id/delete",
    name: "products.delete",
    component: () => import("../views/ProductDeleteView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
