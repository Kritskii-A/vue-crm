<template>
  <div>
    <div class="page-title">
      <h3>{{ "Bill" | localize }}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">
      <HomeBill :rates="currency.rates" />

      <HomeCurrency :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill";
import HomeCurrency from "@/components/HomeCurrency";
import Loader from "../components/app/Loader.vue";
export default {
  name: "Home",
  metaInfo() {
    return { title: this.$title("Bill") };
  },
  data: () => ({
    loading: true, // указываем данные пол умолчанию
    currency: null, // храним данные с сервера, отвечает за валюты
  }),
  async mounted() {
    this.currency = await this.$store.dispatch("fetchCurrency"); // получаем данные из index.js и записываем в переменную
    this.loading = false; // отключаем loader
  },
  methods: {
    async refresh() {
      // обновление данных
      this.loading = true; // включаем отображение загрузки
      this.currency = await this.$store.dispatch("fetchCurrency"); // получаем данные из index.js и записываем в переменную
      this.loading = false; // отключаем loader
    },
  },
  components: {
    HomeBill,
    HomeCurrency,
    Loader,
  },
};
</script>
