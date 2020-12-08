import Vue from 'vue';
import './bootstrap';
import router from './router';
import App from './App.vue';
import store from './store';

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
