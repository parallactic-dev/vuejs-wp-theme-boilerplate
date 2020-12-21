import api from '../../api';
import * as types from '../mutation-types';

// initial state
const state = {
  menusLoaded: false,
  menus: null
};

// actions
const actions = {
  getMenus({ commit }, slug) {
    api.getMenus(menus => {
      commit(types.STORE_FETCHED_MENUS, menus);
      commit(types.MENUS_LOADED, true);
    });
  },
};

// mutations
const mutations = {
  [types.STORE_FETCHED_MENUS](state, menus) {
    state.menus = menus;
  },

  [types.MENUS_LOADED](state, val) {
    state.menusLoaded = val;
  },
};

// getters
const getters = {
  menusLoaded: state => state.menusLoaded,
  menus: state => state.menus,
  mainMenu: state => state.menus && state.menus.main ? state.menus.main : null,
  footerMenu: state => state.menus && state.menus.footer ? state.menus.footer : null,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
