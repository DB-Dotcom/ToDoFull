<template>
  <div id="app">
    <header>
      <h1>ToDo-App</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
        <router-link to="/todos" v-if="isAuthenticated">Meine ToDos</router-link>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <p>&copy; 2024 ToDo-App</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isAuthenticated() {
      // Hier Logik zur Überprüfung der Authentifizierung einfügen
      // Zum Beispiel den Authentifizierungsstatus aus dem Vuex Store abfragen
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>

<style>
#app {
  text-align: center;
}

header, footer {
  padding: 1em;
  background-color: #f5f5f5;
}

nav a {
  margin: 0 10px;
}
</style>
