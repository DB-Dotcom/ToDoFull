import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authToken: null, // Authentifizierungstoken
    todos: []        // Liste der ToDos
  },
  mutations: {
    setAuthToken(state, token) {
      state.authToken = token;
    },
    setTodos(state, todos) {
      state.todos = todos;
    }
  },
  actions: {
    login({ commit }, token) {
      commit('setAuthToken', token);
      // Hier können weitere Aktionen nach der Anmeldung hinzugefügt werden
    },
    logout({ commit }) {
      commit('setAuthToken', null);
      // Hier können weitere Aktionen nach der Abmeldung hinzugefügt werden
    },
    fetchTodos({ commit }) {
      // Hier würde die Logik stehen, um ToDos vom Server zu holen
      // Beispiel: commit('setTodos', fetchedTodos);
    },
    // Weitere Aktionen zur Verwaltung von ToDos können hier hinzugefügt werden
  },
  getters: {
    isAuthenticated(state) {
      return !!state.authToken;
    }
    // Weitere Getter können hier hinzugefügt werden
  }
});
