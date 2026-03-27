import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config'; 
import './assets/styles/main.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);

app.use(PrimeVue); 

app.mount('#app');