import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "history",
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: "/",
        redirect: "/home"
      },
      {
        path: "/home",
        component: () => import("../views/home/page.vue")
      },
      {
        path: "/list",
        component: () => import("../views/list.vue")
      },
      {
        path: "/detail/:id(\\d+)?",
        component: () => import("../views/detail.vue")
      },
      {
        path: "/markdown/*",
        component: () => import("../views/markdown/page.vue")
      },
      {
        path: "/pointer",
        component: () => import("../views/pointer")
      },
      {
        path: "/clipboard",
        component: () => import("../markdown/特色效果/clipboard.vue")
      }
    ]
  });
}
