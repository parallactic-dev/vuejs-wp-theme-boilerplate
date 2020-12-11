import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import hub from './modules/hub';
import user from './modules/user';
import post from './modules/post';
import page from './modules/page';
import categories from './modules/categories';
import common from './modules/common';

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    hub,
    user,
    post,
    page,
    categories,
    common
  },
  strict: process.env.NODE_ENV !== 'production',
});
