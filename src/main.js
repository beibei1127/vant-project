import Vue from 'vue'
import App from './App.vue'
import { axios, get, post } from "@/utils/request.js";

import router from './router'
import store from './store'


import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import 'amfe-flexible/index.js'


Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
