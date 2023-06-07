import App from './App.vue';
import { createApp } from 'vue';
import './style.css';
import pinia from './stores/store';
import router from './router/router';

const app = createApp(App);
app.use(router);
app.use(pinia);

app.mount('#app');
