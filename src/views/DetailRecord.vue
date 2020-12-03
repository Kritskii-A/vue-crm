<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{
          "History" | localize
        }}</router-link>
        <a @click.prevent class="breadcrumb">
          {{ breadcrumb() }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="record.type === 'income' ? 'green' : 'red'">
            <div class="card-content white-text">
              <p>
                {{ "Description" | localize }}:
                <strong>{{ record.description }}</strong>
              </p>
              <p>
                {{ "Amount" | localize }}:
                <strong>{{ record.amount | currency }}</strong>
              </p>
              <p>
                {{ "Category" | localize }}:
                <strong>{{ record.categoryName }}</strong>
              </p>

              <small>{{ record.date | date("datetime") }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>{{ "Record-Undefined" | localize }}</p>
  </div>
</template>

<script>
import localizeFilter from "@/filters/localize.filter"; // подключаем функцию для фильтрации в объекте
export default {
  name: "detail",
  metaInfo() {
    return { title: this.$title("DetailRecord") };
  },

  data: () => ({
    record: null,
    loading: true,
  }),
  async mounted() {
    const id = this.$route.params.id; // получаем айди из строки браузера
    const record = await this.$store.dispatch("fetchRecordById", id);
    const category = await this.$store.dispatch(
      "fetchCategoryById",
      record.categoryId
    );

    this.record = {
      ...record,
      categoryName: category.title,
    };

    this.loading = false;
  },
  methods: {
    breadcrumb() {
      return localizeFilter("Income");
    },
  },
};
</script>
