import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import TodoList from '../views/TodoList.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/todos',
    name: 'TodoList',
    component: TodoList,
    meta: { requiresAuth: true } // Angabe, dass diese Route Authentifizierung erfordert
  }
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // Authentifizierungslogik hier einfügen, z.B. Überprüfung eines Tokens
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn()) { // isLoggedIn ist eine hypothetische Funktion zur Überprüfung des Login-Status
      next({ path: '/login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
