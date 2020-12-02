<template>
  <Loader v-if="loading" />
  <div v-else>
    <div class="app-main-layout">
      <Navbar @click="isOpen = !isOpen" />
      <Sidebar v-model="isOpen" :key="locale" />
      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue"
          to="/record"
          v-tooltip="'Создать новую запись'"
          data-position="left"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import messages from "@/commons/messages";
export default {
  name: "main-layout",
  data: () => ({
    isOpen: true,
    loading: true,
  }),
  async mounted() {
    // проверяем есть ли у нас данные, если нет, то получаем их
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
    // отключаем лоадер, если данные получены

    this.loading = false;
  },
  components: { Navbar, Sidebar },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale() {
      // делаем проверку на ключ. если меняется, то рендерим заново сайдбар
      return this.$store.getters.info.locale;
    },
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || "Что-то пошло не так");
    },
  },
};
</script>
