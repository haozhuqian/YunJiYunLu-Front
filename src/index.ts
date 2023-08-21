import { createApp } from 'vue';
import App from './index.vue';
import pinia from './store';
import router from './router';
import './style/index';
import Icons from './global/icons';

const app = createApp(App);
app.use(Icons);
app.use(pinia);
app.use(router);
app.mount('#app');
