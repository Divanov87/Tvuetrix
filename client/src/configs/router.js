import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '../components/not-found/NotFound.vue';

import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import Dashboard from '../views/dashboard/Dashboard.vue';
import EventCatalog from '../views/events/event-catalog/EventCatalog.vue';
import EventDetails from '../views/events/event-details/EventDetails.vue';
import Search from '../views/search/Search.vue';

const routes = [
  { path: '/', component: Dashboard, name: 'Dashboard' },
  { path: '/events', component: EventCatalog, name: 'EventCatalog' },
  {
    path: '/events',
    children: [
      { path: ':eventId/details', component: EventDetails, name: 'EventDetails' },
    ],
  },
  {
    path: '/auth',
    children: [
      { path: 'login', component: Login, name: 'Login' },
      { path: 'register', component: Register, name: 'Register' },
    ],
  },
  { path: '/search', component: Search, name: 'Search' },
  { path: '/:pathMatch(.*)*', component: NotFound, name: 'NotFound' },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
