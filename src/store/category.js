import firebase from "firebase/app";

export default {
  actions: {
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid"); // ждем и получаем uid пользователя
        const categories =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .once("value")
          ) //получаем значения
            .val() || {}; // получаем значения, и если вдруг ничего нет, то пвозвращаем пустой объект

        // рабочий метод, но следующий лучше
        // const cats = [];
        // // далее преобразовываем в массив
        // Object.keys(categories).forEach((key) => {
        //   cats.push({
        //     title: categories[key].title,
        //     limit: categories[key].limit,
        //     id: key,
        //   });
        // });

        // return cats;

        return Object.keys(categories).map((key) => ({
          ...categories[key],
          id: key,
        }));
      } catch (e) {
        commit("setError", e); // передаем ошибку
        throw e; // останавливаем после ошибки
      }
    },
    async fetchCategoryById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUid"); // ждем и получаем uid пользователя
        const category =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .child(id) // ищем по id
              .once("value")
          ) //получаем значения
            .val() || {}; // получаем значения, и если вдруг ничего нет, то пвозвращаем пустой объект
        return { ...category, id };
      } catch (e) {
        commit("setError", e); // передаем ошибку
        throw e; // останавливаем после ошибки
      }
    },
    async deleteCategory({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUid"); // ждем и получаем uid пользователя
        await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id) // ищем по id
          .remove();

        const records =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/records`)
              .once("value")
          ) //получаем значения
            .val() || {}; // получаем значения, и если вдруг ничего нет, то пвозвращаем пустой объект

        const allRecords = Object.keys(records).map((key) => ({
          ...records[key],
          id: key,
        }));

        //пробегаемся и сносим все данные, если id записи совпадает с id категории
        allRecords.forEach((element) => {
          if (element.categoryId === id) {
            firebase
              .database()
              .ref(`/users/${uid}/records`)
              .child(element.id) // ищем по id
              .remove();
          }
        });
      } catch (e) {
        commit("setError", e); // передаем ошибку
        throw e; // останавливаем после ошибки
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch("getUid"); // ждем и получаем uid пользователя
        await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id) // указываем id
          .update({ title, limit }); // обновляем данные
      } catch (e) {
        commit("setError", e); // передаем ошибку
        throw e; // останавливаем после ошибки
      }
    },
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch("getUid"); // ждем и получаем uid пользователя
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .push({ title, limit }); // если поля нет, то создастся. по окончанию firebase вернет название категории

        return { title, limit, id: category.key };
      } catch (e) {
        commit("setError", e); // передаем ошибку
        throw e; // останавливаем после ошибки
      }
    },
  },
};
