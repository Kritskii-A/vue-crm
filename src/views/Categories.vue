<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate />
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
  components: {
    CategoryCreate,
    CategoryEdit, // регистрируем компоненты
  },
};
</script>
