import Vue from "vue";
import Vuelidate from "vuelidate"; // импортируем валидатор
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter"; // импортируем фильтр
import currencyFilter from "@/filters/currency.filter"; // импортируем фильтр

import tooltipDirective from "@/directives/tooltip.directive"; // испорт tooltip для планирования

import messagePlugin from "@/commons/message.plugin"; // подключаем вывод всплывающих уведомлений
import Loader from "@/components/app/Loader"; // импортируем лоадер
import "materialize-css/dist/js/materialize.min.js"; // импортируем стили

import firebase from "firebase/app"; // импорт firebase
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(Vuelidate); // регистрируем валидатор после импорта
Vue.use(messagePlugin); // регистрируем вывод уведомлений после импорта
Vue.component("Loader", Loader); // регистрируем лоадер
Vue.filter("date", dateFilter); // регистрируем фильтр даты
Vue.directive("tooltip", tooltipDirective); // регистрируем директиву тулптип для планирования
Vue.filter("currency", currencyFilter); // регистрируем фильтр валюты

firebase.initializeApp({
  apiKey: "AIzaSyDTg3Wz175Vf1DaAPra3z4fXzQvMK8QGFU",
  authDomain: "vue-crm-aa0d4.firebaseapp.com",
  databaseURL: "https://vue-crm-aa0d4.firebaseio.com",
  projectId: "vue-crm-aa0d4",
  storageBucket: "vue-crm-aa0d4.appspot.com",
  messagingSenderId: "706344883631",
  appId: "1:706344883631:web:afd28167d4608cfaf14b5a",
  measurementId: "G-4Y0QF7H7JX",
});

// создадим переменную для избежания дубля запуска приложения
let app;

// проверка сессии
firebase.auth().onAuthStateChanged(() => {
  // рендерим приложение, если приложение не было запущено ранее
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
