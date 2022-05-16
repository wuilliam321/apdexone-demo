import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/products",
    name: "products",
    component: HomeView,
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
  {
    path: "/products/add",
    name: "products-add",
    component: () =>
      import(
        /* webpackChunkName: "product-add-view" */ "../views/ProductAddView.vue"
      ),
  },
  {
    path: "/products/:id",
    name: "products-edit",
    component: () =>
      import(
        /* webpackChunkName: "product-edit-view" */ "../views/ProductEditView.vue"
      ),
  },
  {
    path: "/products/:id/delete",
    name: "products-delete",
    component: () =>
      import(
        /* webpackChunkName: "product-delete-view" */ "../views/ProductDeleteView.vue"
      ),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
