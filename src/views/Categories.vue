<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory" />
        <!-- Параметр @created нужно эмитить, для этого в файле categoryCreate после вывода ошибки прописываем эммит и название категории -->
        <CategoryEdit />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate"; // импортируем создание категории
import CategoryEdit from "@/components/CategoryEdit"; // импортируем редактирование категории
import Loader from "../components/app/Loader.vue";

export default {
  name: "categories", // имя этой страницы
  data: () => ({
    categories: [],
    loading: true,
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories"); // после загрузки закинем содержимое в categories
    this.loading = false;
  },
  components: {
    CategoryCreate,
    CategoryEdit,
    Loader, // регистрируем компоненты
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
      console.log(this.categories);
    },
  },
};
</script>
