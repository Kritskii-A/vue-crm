import firebase from "firebase/app";

export default {
  actions: {
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
