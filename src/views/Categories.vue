<template>
  <div>
    <div class="page-title">
      <h3>{{ "Categories" | localize }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory" />
        <!-- Параметр @created нужно эмитить, для этого в файле categoryCreate после вывода ошибки прописываем эммит и название категории -->
        <!-- Далее передаем значение по шаблону в переменной categories -->
        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
          @updatedAfterDeleted="updateInfo"
        />
        <p v-else class="center">{{ "Categories-Empty" | localize }}</p>
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
  metaInfo() {
    return { title: this.$title("Categories") };
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0, // для перерисовки формы добавляем в форму key и плюсуем
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
    },
    updateCategories(category) {
      const idx = this.categories.findIndex((c) => c.id === category.id); // прлучаем индекс категории в массиве
      // обновляем данные
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++;
    },
    async updateInfo() {
      this.loading = true;
      this.categories = await this.$store.dispatch("fetchCategories"); // после удаления обновим содержимоесодержимое в categories
      this.loading = false;
    },
  },
};
</script>
