import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './views/store/store';
import './registerServiceWorker';
import './scss/style.scss';
import './assets/css/mdb.css';
import './assets/css/smart1.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import {
  currency
} from './utils/currency';

Vue.config.productionTip = false;
Vue.filter('currency', currency);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
