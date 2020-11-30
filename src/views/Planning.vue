<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ info.bill | currency("RUB") }}</h4>
    </div>

    <loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      Категории не найдены.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ cat.spend | currency }} из {{ cat.limit | currency }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip" data-position="top">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: cat.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex"; // для вывода состояние счета
import currencyFilter from "@/filters/currency.filter"; // испортируем фильтр для вывода значений
import Loader from "../components/app/Loader.vue";
export default {
  components: { Loader },
  name: "planning",
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(["info"]), // для вывода состояния счета
  },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords"); // получаем записи
    const categories = await this.$store.dispatch("fetchCategories"); // получаем категории

    this.categories = categories.map((cat) => {
      const spend = records
        .filter((r) => r.categoryId === cat.id) // ищем те, у которых совпадают id
        .filter((r) => r.type === "outcome") // получаем все траты
        .reduce((total, record) => {
          return (total += +record.amount); // считаем сумму всех трат
        }, 0);

      const percent = (100 * spend) / cat.limit; // считаем процент
      const progressPercent = percent > 100 ? 100 : percent; // проверка, чтобы процент не был больше 100
      const progressColor =
        percent < 60 ? "green" : percent < 100 ? "yellow" : "red"; // задаем цвет в зависимости от процентов

      // считаем сколько осталось или на сколько превысили
      const tooltipValue = cat.limit - spend;
      const tooltip = `${
        tooltipValue < 0 ? "Превышение на" : "Осталось"
      } ${currencyFilter(Math.abs(tooltipValue))}`;

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend, // сколько итого потрачено
        tooltip,
      };
    });

    this.loading = false;
  },
};
</script>
