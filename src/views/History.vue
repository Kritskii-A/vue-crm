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
      <HistoryTable :records="records" />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
export default {
  name: "history",
  data: () => ({
    loading: true,
    records: [],
    categories: [],
  }),
  async mounted() {
    //this.records = await this.$store.dispatch("fetchRecords"); // получаем записи
    const records = await this.$store.dispatch("fetchRecords"); // получаем записи
    this.categories = await this.$store.dispatch("fetchCategories"); // получаем категории

    this.records = records.map((record) => {
      return {
        ...record,
        categoryName: this.categories.find((c) => c.id === record.categoryId)
          .title, // получаем название категории
        typeClass: record.type === "income" ? "green" : "red", // выводим цвет поля тип
        typeText: record.type === "income" ? "Доход" : "Расход", // выводим текст поля тип
      };
    });

    this.loading = false;
  },
  components: {
    HistoryTable,
  },
};
</script>
