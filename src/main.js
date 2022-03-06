import Vue from 'vue';
import Snotify from 'vue-snotify';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
library.add(fas);
Vue.component('fa-icon', FontAwesomeIcon);

Vue.use(Snotify, {
  global: {
    preventDuplicates: true,
  },
  toast: {
    timeout: 500,
    showProgressBar: false,
    position: 'rightTop',
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
