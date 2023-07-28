import { createApp } from 'vue';
import App from './App.vue';
import pinia from './store';
import router from './router';
import './style/_reset.scss';
import Icons from './global/icons';
import api from './api/http/index.ts';

const app = createApp(App);
app.$api = api;
app.use(Icons);
app.use(pinia);
app.use(router);
app.mount('#app');
