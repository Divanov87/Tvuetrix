import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './configs/router';

import { i18n } from './i18n';
import './styles.css';

const pinia = createPinia();
const app = createApp(App);

app.use(i18n);
app.use(router);
app.use(pinia);
app.mount('#app');


