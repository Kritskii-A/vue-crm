<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!records.length">
      Записи не найдены.
      <router-link to="/record">Добавить новую запись</router-link>
    </p>
    <section v-else>
      <HistoryTable :records="items" />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination center'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import paginationMixin from "@/mixins/pagination.mixin";
import HistoryTable from "@/components/HistoryTable";
export default {
  name: "history",
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
  }),
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords"); // получаем записи
    const categories = await this.$store.dispatch("fetchCategories"); // получаем категории

    // подключаем пагинацию
    this.setupPagination(
      this.records.map((record, index) => {
        return {
          ...record,
          categoryName: categories.find((c) => c.id === record.categoryId)
            .title, // получаем название категории
          typeClass: record.type === "income" ? "green" : "red", // выводим цвет поля тип
          typeText: record.type === "income" ? "Доход" : "Расход", // выводим текст поля тип

          number: index + 1, // нумерация полей
        };
      })
    );

    this.loading = false;
  },
  components: {
    HistoryTable,
  },
};
</script>
