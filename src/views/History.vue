<template>
  <div>
    <div class="page-title">
      <h3>{{ "History-Records" | localize }}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!records.length">
      {{ "NoEntriesFound" | localize }}
      <router-link to="/record">{{ "AddNewRecord" | localize }}</router-link>
    </p>
    <section v-else>
      <HistoryTable :records="items" />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="localizeFilter('Prev')"
        :next-text="localizeFilter('Next')"
        :container-class="'pagination center'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import paginationMixin from "@/mixins/pagination.mixin";
import HistoryTable from "@/components/HistoryTable";
import localizeFilter from "@/filters/localize.filter"; // подключаем функцию для фильтрации в объекте
import { Pie } from "vue-chartjs"; // подключаем графики
export default {
  name: "history",
  metaInfo() {
    return { title: this.$title("History") };
  },
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
  }),
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords"); // получаем записи
    const categories = await this.$store.dispatch("fetchCategories"); // получаем категории

    this.setup(categories);

    this.loading = false;
  },
  methods: {
    setup(categories) {
      // подключаем пагинацию
      this.setupPagination(
        this.records.map((record, index) => {
          return {
            ...record,
            categoryName: categories.find((c) => c.id === record.categoryId)
              .title, // получаем название категории
            typeClass: record.type === "income" ? "green" : "red", // выводим цвет поля тип
            typeText:
              record.type === "income"
                ? localizeFilter("Income")
                : localizeFilter("Outcome"), // выводим текст поля тип

            number: index + 1, // нумерация полей
          };
        })
      );

      this.renderChart({
        labels: categories.map((c) => c.title), //подгружаем категории на графики
        datasets: [
          {
            label: localizeFilter("ExpensesByCategory"),
            data: categories.map((c) => {
              // подтягиваем данные по тратам для построения в график
              return this.records.reduce((total, r) => {
                if (r.categoryId === c.id && r.type === "outcome") {
                  total += +r.amount;
                }
                return total;
              }, 0);
            }),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    },
    localizeFilter(value) {
      return localizeFilter(value);
    },
  },
  watch: {
    $route(to) {
      if (!to.query.page) {
        // кликнули в сайдбаре на История
        this.pageChangeHandler(1);
        this.page = 1;
      }
    },
  },
  components: {
    HistoryTable,
  },
};
</script>
