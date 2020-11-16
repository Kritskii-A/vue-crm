/* eslint-disable */
import { email } from "vuelidate/lib/validators";

import firebase from "firebase/app";

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        throw e;
      }
    },
    async logout() {
      await firebase.auth().signOut();
    },
  },
};
