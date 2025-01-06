import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { createPinia } from 'pinia'

const pinia = createPinia();

Vue.use(BootstrapVue)
Vue.use(pinia)
