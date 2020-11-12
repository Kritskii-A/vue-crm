import Vue from "vue";
import Vuelidate from "vuelidate"; // импортируем валидатор
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter"; // импортируем фильтр
import messagePlugin from "@/commons/message.plugin"; // подключаем вывод всплывающих уведомлений
import "materialize-css/dist/js/materialize.min.js"; // импортируем стили

Vue.config.productionTip = false;

Vue.use(Vuelidate); // регистрируем валидатор после импорта
Vue.use(messagePlugin); // регистрируем вывод уведомлений после импорта
Vue.filter("date", dateFilter); // регистрируем фильтр

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
