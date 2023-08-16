import { createApp } from 'vue';
import App from './view/v.vue';
import pinia from './store';
import router from './router';
import './style/_reset.scss';
import Icons from './global/icons';

const app = createApp(App);
app.use(Icons);
app.use(pinia);
app.use(router);
app.mount('#app');
