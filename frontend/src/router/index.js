import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "",
    name: "toolbar",
    component: () => import("../components/Toolbar.vue"),
    children: [
      {
        path: "/product",
        name: "apicon",
        component: () => import("../views/Product.vue"),
      },
      {
        path: "/oder",  
        name: "oder",
        component: () => import("../views/Oder.vue"),
      },
    ],
  },
  {
    path: "/createproduct",
    name: "createproduct",
    component: () => import("../views/CreateProduct.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
