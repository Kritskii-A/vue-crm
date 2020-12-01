import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { layout: "empty" },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/categories",
    name: "Categories",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Categories.vue"),
  },
  {
    path: "/detail-record",
    name: "Detail Record",
    meta: { layout: "main", auth: true },
    component: () => import("../views/DetailRecord.vue"),
  },
  {
    path: "/history",
    name: "History",
    meta: { layout: "main", auth: true },
    component: () => import("../views/History.vue"),
  },
  {
    path: "/planning",
    name: "Planning",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Planning.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/record",
    name: "Record",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Record.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: { layout: "empty" },
    component: () => import("../views/Register.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // to - куда идем, from - откуда, next - функция (например для редиректа)

  const currentUser = firebase.auth().currentUser; // проверяем есть ли пользователь
  const requireAuth = to.meta.auth; // получаем нужна ли авторизация для доступа к странице

  // tckb нужна авторизация и данных о пользователе нет, то делаем редирект на логин
  if (requireAuth && !currentUser) {
    next("/login?message=login");
  } else {
    next();
  }
});

export default router;
