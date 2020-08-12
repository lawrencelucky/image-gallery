import Vue from 'vue';
import VueRouter from 'vue-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { BootstrapVue } from 'bootstrap-vue';
import App from './App.vue';
import { routes } from './routes';

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.config.productionTip = false;

export const eventBus = new Vue();

const router = new VueRouter({
  routes,
  mode: 'history'
});
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
