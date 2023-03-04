// ignorei18n_start
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/components/Home.vue"),
    meta: {
      hideNavbar: true
    }
  },
  {
    path: "/new",
    name: "NewGame",
    component: () => import("@/components/NewGame.vue")
  },
  {
    path: "/bday",
    name: "BdayPics",
    component: () => import("@/components/BdayPics.vue")
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;

// ignorei18n_end
