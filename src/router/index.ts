import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/item/:item_id",
      name: "item",
      component: () => import("../views/ItemView.vue"),
    },
  ],
});

export default router;
