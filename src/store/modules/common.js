import api from '../../api';
import * as types from '../mutation-types';

// initial state
const state = {
  menusLoaded: false,
  menus: null,
  metaLoaded: false,
  meta: null,
};

// actions
const actions = {
  getMenus({ commit }) {
    api.getMenus(menus => {
      commit(types.STORE_FETCHED_MENUS, menus);
      commit(types.MENUS_LOADED, true);
    });
  },
  getMeta({ commit }) {
    api.getMeta(meta => {
      commit(types.STORE_FETCHED_META, meta);
      commit(types.META_LOADED, true);
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

  [types.STORE_FETCHED_META](state, meta) {
    state.meta = meta;
  },
  [types.META_LOADED](state, val) {
    state.metaLoaded = val;
  },
};

// getters
const getters = {
  menusLoaded: state => state.menusLoaded,
  menus: state => state.menus,
  mainMenu: state => state.menus && state.menus.main ? state.menus.main : null,
  footerMenu: state => state.menus && state.menus.footer ? state.menus.footer : null,
  metaLoaded: state => state.metaLoaded,
  meta: state => state.meta,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
