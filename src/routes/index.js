import Dashboard from "@/views/Dashboard.vue";

import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from "vue-router";

const routes = [
  {
    path: "/dashboard",
    alias: ["/"],
    component: () => import("@/views/Dashboard.vue"),
  },
  {
    path: "/manager-product",
    component: () => import("@/views/ManagerProduct.vue"),
  },
  { path: "/manager-user", component: () => import("@/views/ManagerUser.vue") },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
