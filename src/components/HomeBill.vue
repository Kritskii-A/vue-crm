<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{ "AccountInTheCurrency" | localize }}</span>

        <p v-for="cur of currencies" :key="cur" class="currency-line">
          <span>{{ getCurrency(cur) | currency(cur) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // записываем props, сообщая, что передаем данные для вывода
  props: ["rates"],
  data: () => ({
    currencies: ["RUB", "USD", "EUR"],
  }),
  computed: {
    base() {
      return (
        //this.$store.getters.info.bill / (this.rates["RUB"] / this.rates["EUR"])
        this.$store.getters.info.bill
      ); // получаем количество денег у пользователя в EUR
    },
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency]);
    },
  },
};
</script>
