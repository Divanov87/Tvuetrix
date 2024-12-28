import { createRouter, createWebHistory } from 'vue-router';

import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';

import Dashboard from '../views/dashboard/Dashboard.vue';

const routes = [
  { path: '/', component: Dashboard, name: 'Dashboard' },
  {
    path: '/auth',
    children: [
      { path: 'login', component: Login, name: 'Login' },
      { path: 'register', component: Register, name: 'Register' },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
