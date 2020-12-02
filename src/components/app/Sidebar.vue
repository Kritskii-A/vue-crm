<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>
<script>
import localizeFilter from "@/filters/localize.filter"; // подключаем функцию для фильтрации в объекте
export default {
  props: ["value"],
  data: () => ({
    links: [
      { title: localizeFilter("Menu-Bill"), url: "/", exact: true },
      { title: localizeFilter("Menu-History"), url: "/history" },
      { title: localizeFilter("Menu-Planing"), url: "/planning" },
      { title: localizeFilter("Menu-NewRecord"), url: "/record" },
      { title: localizeFilter("Menu-Categories"), url: "/categories" },
    ],
  }),
};
</script>
