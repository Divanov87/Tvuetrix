import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '../components/not-found/NotFound.vue';


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
import EventDetails from '../views/events/event-details/EventDetails.vue';
import EventTheater from '../views/events/event-theater/EventTheater.vue';
import Profile from '../views/profile/Profile.vue';
import Search from '../views/search/Search.vue';



const routes = [
  { path: '/', component: Dashboard, name: 'Dashboard' },
  { path: '/events', component: EventCatalog, name: 'EventCatalog' },
  {
    path: '/events',
    children: [
      { path: 'theater', component: EventTheater, name: 'EventTheater' },
      { path: 'concerts', component: EventConcerts, name: 'EventConcerts' },
      { path: 'add', component: EventAdd, name: 'EventAdd' },
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
  { path: '/admin-panel', component: AdminPanel },
  {
    path: '/admin-panel',
    children: [
      { path: 'users', component: Users, name: 'AdminUsers' },
      { path: 'messages', component: Messages, name: 'AdminMessages' },
      { path: 'bulletin', component: Bulletin, name: 'AdminBulletin' },
    ],
  },
  { path: '/search', component: Search, name: 'Search' },
  { path: '/profile', component: Profile, name: 'Profile' },
  { path: '/contacts', component: Contacts, name: 'Contacts' },
  { path: '/:pathMatch(.*)*', component: NotFound, name: 'NotFound' },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
