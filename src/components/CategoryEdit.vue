<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ "Edit" | localize }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="c of categories" :key="c.id" :value="c.id">{{
              c.title
            }}</option>
          </select>
          <label>{{ "SelectCategory" | localize }}</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />
          <label for="name">{{ "Name" | localize }}</label>
          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
            >{{ "EnterTheCategoryName" | localize }}</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          />
          <label for="limit">{{ "Limit" | localize }}</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            >{{ "MinimumValue" | localize }}
            {{ $v.limit.$params.minValue.min }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ "Update" | localize }}
          <i class="material-icons right">send</i>
        </button>
      </form>
      <div style="padding-top: 1rem;">
        <button class="btn red" @click="deleteCategory">
          {{ "Delete" | localize }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
import localizeFilter from "@/filters/localize.filter"; // подключаем функцию для фильтрации в объекте
export default {
  // указываем, что мы принимаем данные
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    title: "",
    limit: 100,
    select: null,
    current: null,
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) },
  },
  watch: {
    // watch следит за изменениями
    current(catId) {
      // ищем категорию, которую выбрали
      const { title, limit } = this.categories.find((c) => c.id === catId);
      // записываем значения в поля
      this.title = title;
      this.limit = limit;
    },
  },
  created() {
    //created стартует сразу при открытии
    const { id, title, limit } = this.categories[0]; // получаем значения категории по умолчанию и записываем их в поля
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        // проверяем есть ли ошибки
        // если ошибки есть, то выводим ошибку
        this.$v.$touch();
        return;
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };
        await this.$store.dispatch("updateCategory", categoryData);

        this.$message(localizeFilter("DataUpdated"));

        // обновляем информацию в текущих полях, передавая в categories.vue
        this.$emit("updated", categoryData);
      } catch (e) {
        console.log(e);
      }
    },
    async deleteCategory() {
      this.$store.dispatch("deleteCategory", this.current);

      const categoryData = {
        id: this.current,
        title: this.title,
        limit: this.limit,
      };
      this.$emit("updatedAfterDeleted", categoryData);
      this.$message(localizeFilter("DeleteCategory"));
    },
  },
  mounted() {
    this.select = window.M.FormSelect.init(this.$refs.select);
    window.M.updateTextFields();
  },
  destroyed() {
    // избегаем утечки памяти
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>
