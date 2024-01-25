<template>
    <div class="register-container">
      <h2>Registrieren</h2>
      <form @submit.prevent="handleRegister">
        <input type="text" v-model="username" placeholder="Benutzername" required />
        <input type="password" v-model="password" placeholder="Passwort" required />
        <button type="submit">Registrieren</button>
        <p v-if="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Register',
    data() {
      return {
        username: '',
        password: '',
        error: ''
      };
    },
    methods: {
      async handleRegister() {
        try {
          const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: this.username, password: this.password })
          });
          const data = await response.json();
          if (response.ok) {
            this.$router.push('/login'); // Weiterleitung zur Login-Seite nach erfolgreicher Registrierung
          } else {
            this.error = data.message || 'Registrierung fehlgeschlagen';
          }
        } catch (err) {
          this.error = 'Ein Fehler ist aufgetreten';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .register-container {
    /* Stil für den Registrierungs-Container */
  }
  </style>
  