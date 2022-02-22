import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/tv-series",
      name: "tv-series",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Tv-series.vue"),
    },
    {
      path: "/movies",
      name: "movies",
      
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Movie.vue"),
      
    },
    {
      path: "/movie/:id",
      name: "movieDetail",
      
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/MovieDetail.vue"),
      
    },
    {
      path: "/tv/:id",
      name: "tvDetail",
      
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/MovieDetail.vue"),
      
    },
    
  ],
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || {top:0}
  },
  linkActiveClass:'active'
  
  
});

export default router;
