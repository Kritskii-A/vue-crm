import _ from "lodash";

export default {
  data() {
    return {
      page: +this.$route.query.page || 1, // страница по умолчанию
      pageSize: 2,
      pageCount: 0,
      allItems: [], // все данные
      items: [], // то, что сейчас выведено
    };
  },
  methods: {
    pageChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`); // добавляем в адресную строку query параметр для удобства пользователей
      this.items = this.allItems[page - 1] || this.allItems[0]; // текущая страница при клике на пагинатор
    },

    setupPagination(allItems) {
      this.allItems = _.chunk(allItems, this.pageSize); // разбиваем все записи на массивы
      this.pageCount = _.size(this.allItems); // считаем количество страниц через колличество массивов

      this.items = this.allItems[this.page - 1] || this.allItems[0]; // текущая страница
    },
  },
};
