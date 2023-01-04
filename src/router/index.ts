import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("~/views/index.vue"),
    meta: {
      title: "首页",
    },
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
  strict: true,
});

router.beforeEach(async (to, from, next) => {
  next();
});

// 全局后置守卫
router.afterEach((to, from, next) => {
  // do something
});

export default router;
