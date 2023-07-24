import { createApp } from 'vue';
import App from './App.vue';
import pinia from './store';
import './style/_reset.scss';

const app = createApp(App);
app.use(pinia);
app.mount('#app');
