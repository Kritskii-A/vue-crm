import firebase from "firebase/app"; // подключаем БД

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {}; // очищаем, чтобы сессии пользователей не пересекались
    },
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        // получаем из БД значение поля инфо
        const uid = await dispatch("getUid"); // вызываем dispatch и указываем метод, который уже реализован - получаем uid
        const info = (
          await firebase
            .database()
            .ref(`/users/${uid}/info`)
            .once("value")
        ).val(); // получаем значение поля инфо
        commit("setInfo", info);
      } catch (e) {
        console.log(e);
      }
    },
  },
  getters: {
    info: (s) => s.info,
  },
};
