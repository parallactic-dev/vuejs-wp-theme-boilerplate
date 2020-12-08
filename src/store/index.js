import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import hub from './modules/hub';
import user from './modules/user';
import post from './modules/post';
import page from './modules/page';
import categories from './modules/categories';

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    hub,
    user,
    post,
    page,
    categories
  },
  strict: process.env.NODE_ENV !== 'production',
});
