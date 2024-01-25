<template>
    <div class="home">
      <h1>Willkommen bei der ToDo-App</h1>
      <p>Verwalten Sie Ihre Aufgaben effizient und einfach.</p>
      <todo-list v-if="isLoggedIn"></todo-list>
      <div v-else>
        <p>Bitte <router-link to="/login">einloggen</router-link> oder <router-link to="/register">registrieren</router-link>, um die App zu nutzen.</p>
      </div>
    </div>
  </template>
  
  <script>
  import TodoList from './components/TodoList.vue';
  import { mapGetters } from 'vuex';
  
  export default {
    name: 'Home',
    components: {
      TodoList
    },
    computed: {
      ...mapGetters(['isLoggedIn'])
    }
  };
  </script>
  
  <style scoped>
  h1 {
    color: #2c3e50;
  }
  </style>
  