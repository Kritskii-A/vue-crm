import localizeFilter from "@/filters/localize.filter"; // подключаем функцию для фильтрации в объекте

export default {
  install(Vue) {
    Vue.prototype.$title = function(titleKey) {
      const appName = process.env.VUE_APP_TITLE;
      return `${localizeFilter(titleKey)} | ${appName}`;
    };
  },
};
