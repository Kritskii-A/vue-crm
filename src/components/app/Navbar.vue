<template>
  <nav class="navbar light-blue darken-4">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')">
          <i class="material-icons white-text">dehaze</i>
        </a>
        <span class="white-text hide-on-small-and-down">{{
          date | date("datetime")
        }}</span>
      </div>

      <ul class="right">
        <li>
          <a
            class="dropdown-trigger white-text"
            href="#"
            data-target="dropdown"
            ref="dropDownOpen"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i
                >{{ "Profile" | localize }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i
                >{{ "Logout" | localize }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null,
  }),
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login?message=logout"); // переадресация
    },
  },
  computed: {
    name() {
      return this.$store.getters.info.name; // получаем имя пользователя
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
    this.dropdown = window.M.Dropdown.init(this.$refs.dropDownOpen, {
      constrainWidth: false,
    });
  },
  beforeDestroy() {
    clearInterval(this.interval); //очистка памяти
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  }, // позволяет очистить и не засорять память, если элементы не отображаются
};
</script>
