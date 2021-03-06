<template>
  <div>
    <div class="page-title">
      <h3>{{ "Profile" | localize }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{
            invalid: $v.name.$dirty && !$v.name.required,
          }"
        />
        <label for="description">{{ "Name" | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >{{ "Message-EnterName" | localize }}</small
        >
      </div>

      <div class="input-field">
        <input
          id="bill"
          type="text"
          v-model="bill"
          :class="{
            invalid: $v.bill.$dirty && !$v.bill.minValue,
          }"
        />
        <label for="description">{{ "Bill" | localize }}</label>
        <span
          class="helper-text invalid"
          v-if="$v.bill.$dirty && !$v.bill.minValue"
          >{{ "MinimumValue" | localize }}
          {{ $v.bill.$params.minValue.min }}</span
        >
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ "Update" | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"; // mapGetters - если будем получать данные, mapActions - если будем отправлять данные
import { required, minValue } from "vuelidate/lib/validators"; // импортируем валидаторы, которые будем использовать
export default {
  metaInfo() {
    return { title: this.$title("Profile") };
  },
  data: () => ({
    name: "",
    bill: "",
    isRuLocale: true,
  }),
  validations: {
    name: { required },
    bill: { minValue: minValue(100) },
  },
  mounted() {
    this.name = this.info.name; // вставляем имя
    this.bill = this.info.bill; // вставляем имя

    this.isRuLocale = this.info.locale === "ru-RU"; // проверяем какая локализация стоит у пользователя
    // таймаут нужен, чтобы успела отрендериться страница
    setTimeout(() => {
      window.M.updateTextFields();
    });
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        await this.updateInfo({
          name: this.name,
          bill: this.bill,
          locale: this.isRuLocale ? "ru-RU" : "en-US", // записываем в БД локализацию
        });
        this.$message("Данные обновлены");
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
    ...mapGetters(["info"]),
  },
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
