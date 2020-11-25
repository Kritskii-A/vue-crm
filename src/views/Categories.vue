<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
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

export default {
  name: "categories", // имя этой страницы
  data: () => ({
    categories: [],
  }),
  components: {
    CategoryCreate,
    CategoryEdit, // регистрируем компоненты
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
      console.log(this.categories);
    },
  },
};
</script>
