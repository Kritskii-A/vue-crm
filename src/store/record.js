import firebase from "firebase/app";

export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const uid = await dispatch(`getUid`);
        return await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .push(record);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid"); // ждем и получаем uid пользователя
        const records =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/records`)
              .once("value")
          ) //получаем значения
            .val() || {}; // получаем значения, и если вдруг ничего нет, то пвозвращаем пустой объект

        return Object.keys(records).map((key) => ({
          ...records[key],
          id: key,
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchRecordById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch("getUid"); // ждем и получаем uid пользователя
        const record =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/records`)
              .child(id) // ищем по id
              .once("value")
          ) //получаем значения
            .val() || {}; // получаем значения, и если вдруг ничего нет, то возвращаем пустой объект

        return { ...record, id };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
};
