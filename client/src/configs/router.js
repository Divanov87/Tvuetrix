import { computed } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import NotFound from '../components/not-found/NotFound.vue';

import { useAuthStore } from '../store/authStore';

import About from '../views/About.vue';
import AdminPanel from '../views/admin-panel/AdminPanel.vue';
import Bulletin from '../views/admin-panel/components/Bulletin.vue';
import Messages from '../views/admin-panel/components/Messages.vue';
import Users from '../views/admin-panel/components/Users.vue';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import Contacts from '../views/Contacts.vue';
import Dashboard from '../views/dashboard/Dashboard.vue';
import EventAdd from '../views/events/event-add/EventAdd.vue';
import EventCatalog from '../views/events/event-catalog/EventCatalog.vue';
import EventConcerts from '../views/events/event-concerts/EventConcerts.vue';
import EventCharts from '../views/events/event-details/event-charts/EventCharts.vue';
import EventDetails from '../views/events/event-details/EventDetails.vue';
import EventEdit from '../views/events/event-edit/EventEdit.vue';
import EventTheater from '../views/events/event-theater/EventTheater.vue';
import Profile from '../views/profile/Profile.vue';
import Search from '../views/search/Search.vue';

async function isAuth() {
  const authStore = useAuthStore();
  await authStore.setUserFromToken();
  return authStore.isLogged ? true : { path: '/auth/login' };
}

async function validateUser() {
  const authStore = useAuthStore();
  await authStore.setUserFromToken();

  const user = computed(() => authStore.user);
  return user.value?.role === 'user'
    ? true
    : { path: '/auth/login' };
}

async function validateAdmin() {
  const authStore = useAuthStore();
  await authStore.setUserFromToken();

  const user = computed(() => authStore.user);
  return user.value?.role === 'admin'
    ? true
    : { path: '/' };
}

const routes = [
  { path: '/', component: Dashboard, name: 'Dashboard' },
  { path: '/events', component: EventCatalog, name: 'EventCatalog' },
  { path: '/events/theater', component: EventTheater, name: 'EventTheater' },
  { path: '/events/concerts', component: EventConcerts, name: 'EventConcerts' },
  { path: '/events/add', component: EventAdd, name: 'EventAdd', beforeEnter: validateAdmin },
  // { path: '/events/:eventId/details', component: EventDetails, name: 'EventDetails' },
  {
    path: '/events/:eventId/details',
    name: 'EventDetails',
    component: EventDetails,
    children: [
      {
        path: 'charts',
        name: 'EventCharts',
        component: EventCharts,
        beforeEnter: validateAdmin
      },
    ],
  },
  { path: '/events/:eventId/edit', component: EventEdit, name: 'EventEdit', beforeEnter: validateAdmin },
  { path: '/auth/login', component: Login, name: 'Login' },
  { path: '/auth/register', component: Register, name: 'Register' },
  { path: '/admin-panel', component: AdminPanel, name: 'AdminPanel', beforeEnter: validateAdmin },
  { path: '/admin-panel/users', component: Users, name: 'AdminUsers' },
  { path: '/admin-panel/messages', component: Messages, name: 'AdminMessages' },
  { path: '/admin-panel/bulletin', component: Bulletin, name: 'AdminBulletin' },
  { path: '/search', component: Search, name: 'Search', beforeEnter: isAuth },
  { path: '/profile', component: Profile, name: 'Profile', beforeEnter: validateUser },
  { path: '/contacts', component: Contacts, name: 'Contacts' },
  { path: '/about', component: About, name: 'About' },
  { path: '/:pathMatch(.*)*', component: NotFound, name: 'NotFound' },
];

// Works but its a bit hacky/wrong?

// const routes = [
//   { path: '/', component: Dashboard, name: 'Dashboard' },
//   { path: '/events', component: EventCatalog, name: 'EventCatalog' },
//   {
//     path: '/events',
//     children: [
//       { path: 'theater', component: EventTheater, name: 'EventTheater' },
//       { path: 'concerts', component: EventConcerts, name: 'EventConcerts' },
//       { path: 'add', component: EventAdd, name: 'EventAdd', beforeEnter: validateAdmin },
//       { path: ':eventId/details', component: EventDetails, name: 'EventDetails' },
//       { path: ':eventId/edit', component: EventEdit, name: 'EventEdit', beforeEnter: validateAdmin },
//     ],
//   },
//   {
//     path: '/auth',
//     children: [
//       { path: 'login', component: Login, name: 'Login' },
//       { path: 'register', component: Register, name: 'Register' },
//     ],
//   },
//   { path: '/admin-panel', component: AdminPanel, beforeEnter: validateAdmin },
//   {
//     path: '/admin-panel',
//     children: [
//       { path: 'users', component: Users, name: 'AdminUsers' },
//       { path: 'messages', component: Messages, name: 'AdminMessages' },
//       { path: 'bulletin', component: Bulletin, name: 'AdminBulletin' },
//     ],
//   },
//   { path: '/search', component: Search, name: 'Search', beforeEnter: isAuth },
//   { path: '/profile', component: Profile, name: 'Profile', beforeEnter: validateUser },
//   { path: '/contacts', component: Contacts, name: 'Contacts' },
//   { path: '/about', component: About, name: 'About' },
//   { path: '/:pathMatch(.*)*', component: NotFound, name: 'NotFound' },
// ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
