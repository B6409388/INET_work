import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

const routes = [
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Cutgrade.vue"),
  },
  {
    path: "",
    name: "toolbar",
    component: () => import("../components/Toolbar.vue"),
    children: [
      {
        path: "/profile",
        name: "profile",
        component: () => import("../views/profile.vue"),
      },
      {
        path: "/Cutgrade",
        name: "Cutgrade",
        component: () => import("../views/Cutgrade.vue"),
      }
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
