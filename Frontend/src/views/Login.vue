<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input type="text" v-model="username" placeholder="Benutzername" required />
        <input type="password" v-model="password" placeholder="Passwort" required />
        <button type="submit">Einloggen</button>
        <p v-if="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        error: ''
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: this.username, password: this.password })
          });
          const data = await response.json();
          if (response.ok) {
            this.$store.commit('setAuthToken', data.token); // Token im Vuex Store speichern
            this.$router.push('/'); // Zum Hauptdashboard weiterleiten
          } else {
            this.error = data.message || 'Login fehlgeschlagen';
          }
        } catch (err) {
          this.error = 'Ein Fehler ist aufgetreten';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    /* Stil für den Login-Container */
  }
  </style>
  