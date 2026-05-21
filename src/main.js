<<<<<<< HEAD
import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
=======
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import './assets/main.css'

import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
>>>>>>> 34d3565572b641ec35a221276ecac12fa5917247

import App from "./App.vue";
import router from "./router";
const app = createApp(App);

<<<<<<< HEAD
app.use(createPinia());
app.use(router);
app.mount("#app");
=======
app.use(createPinia())
app.use(router)
app.component('Navbar', Navbar)
app.component('Footer', Footer)
app.mount('#app')
>>>>>>> 34d3565572b641ec35a221276ecac12fa5917247
