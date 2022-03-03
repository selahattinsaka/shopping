import Vue from 'vue';
import Snotify from 'vue-snotify';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Snotify, {
  global: {
    preventDuplicates: true,
  },
  toast: {
    timeout: 2000,
    showProgressBar: false,
    position: 'rightTop',
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
