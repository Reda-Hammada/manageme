import { createApp } from 'vue'
import {createPinia} from 'pinia';
import App from './App.vue'
import VeeValidatePlugin from '@/plugins/validator.js'
import axios from 'axios';
import VueAxios from 'vue-axios';
import '@/assets/main.css'


const app = createApp(App);
app.use(createPinia());
app.use(VeeValidatePlugin)
app.use(VueAxios, axios)

app.mount('#app');
