<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      Категории не найдены.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <form class="form" v-else>
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="c of categories" :key="c.id" :value="c.id">{{
            c.title
          }}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input id="amount" type="number" />
        <label for="amount">Сумма</label>
        <span class="helper-text invalid">amount пароль</span>
      </div>

      <div class="input-field">
        <input id="description" type="text" />
        <label for="description">Описание</label>
        <span class="helper-text invalid">description пароль</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import Loader from "../components/app/Loader.vue";

export default {
  name: "record",
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories"); // получаем категории
    this.loading = false; // отключаем loader

    // отображаем значение по умолчанию при загрузке
    if (this.categories.length) {
      this.category = this.categories[0].id;
    }

    // включаем select
    // используем setTimeout, потому что иначе select еще не успеет отобразиться и отработать
    setTimeout(() => {
      this.select = window.M.FormSelect.init(this.$refs.select);
    }, 0);
  },
  destroyed() {
    // избегаем утечки памяти, удаляем плагин
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  components: {
    Loader,
  },
};
</script>
