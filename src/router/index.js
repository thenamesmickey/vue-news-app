import { createRouter, createWebHistory } from "vue-router";
import NewsSearchPage from "@/views/NewsSearchPage.vue";
import NewsDetailPage from "@/views/NewsDetailPage.vue";
import BookmarksPage from "@/views/BookmarksPage.vue";

const routes = [
  {
    path: "/",
    name: "NewsSearch",
    component: NewsSearchPage,
  },
  {
    path: "/detail",
    name: "NewsDetail",
    component: NewsDetailPage,
  },
  {
    path: "/bookmarks",
    name: "Bookmarks",
    component: BookmarksPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
