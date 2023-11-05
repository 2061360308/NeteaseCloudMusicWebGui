const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("layouts/PlayerLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  {
    path: "/playlist",
    name: "playlist",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/PlaylistPage.vue") }],
  },
  {
    path: "/search_detail",
    name: "search_detail",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/SearchDetail.vue") }],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/LoginPage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
