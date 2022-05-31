import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import ProductListView from "../views/ProductListView.vue";
import InventoryView from "../views/InventoryView.vue";

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
    component: InventoryView,
    name: "inventory",
    children: [
      {
        path: "",
        components: { inventory: () => import("../views/ProductListView.vue") },
      },
      {
        path: "products",
        name: "products.list",
        components: { inventory: () => import("../views/ProductListView.vue") },
      },
      {
        path: "stock",
        name: "stock.list",
        components: { inventory: () => import("../views/StockView.vue") },
      },
      {
        path: "stock/add",
        name: "stock.add",
        components: { inventory: () => import("../views/StockAddView.vue") },
      },
      {
        path: "stock/report",
        name: "stock.report",
        components: { inventory: () => import("../views/StockReportView.vue") },
      },
      {
        path: "products/add",
        name: "products.add",
        components: { inventory: () => import("../views/ProductAddView.vue") },
      },
      {
        path: "products/:id",
        name: "products.edit",
        components: { inventory: () => import("../views/ProductEditView.vue") },
      },
      {
        path: "products/:id/delete",
        name: "products.delete",
        components: {
          inventory: () => import("../views/ProductDeleteView.vue"),
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
