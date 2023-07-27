import { createApp } from 'vue';
import App from './App.vue';
import pinia from './store';
import router from './router';
import './style/_reset.scss';

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
