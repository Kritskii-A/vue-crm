import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import info from "./info";
import category from "./category"; //импортируем store - category
import record from "./record"; //импортируем store - record

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  getters: {
    error: (s) => s.error,
  },
  actions: {
    async fetchCurrency() {
      /*const key = process.env.VUE_APP_FIXER; // получаем ключ API
       const result = await fetch(
        `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`
      ); // получаем данные */
      const result = await fetch(
        `https://api.exchangeratesapi.io/latest?base=RUB&symbols=RUB,EUR,USD`
      ); // получаем данные
      return await result.json(); // распарсим и возвращаем данные
    },
  },
  modules: {
    auth,
    info,
    category,
    record,
  },
});
