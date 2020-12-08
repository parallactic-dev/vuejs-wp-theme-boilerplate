import api from '../../api';
import * as types from '../mutation-types';

// initial state
const state = {
  loaded: false,
  all: [],
  page: null,
};

// actions
const actions = {
  getPage({ commit }, slug) {
    api.getPage(slug, page => {
      commit(types.STORE_FETCHED_PAGE, page);
      commit(types.PAGE_LOADED, true);
      commit(types.INCREMENT_LOADING_PROGRESS);
    });
  },
  getPages({ commit }) {
    api.getPages(pages => {
      commit(types.STORE_FETCHED_PAGES, { pages });
      commit(types.PAGES_LOADED, true);
      commit(types.INCREMENT_LOADING_PROGRESS);
    });
  },
};

// mutations
const mutations = {
  [types.STORE_FETCHED_PAGE](state, page) {
    state.page = page;
  },

  [types.PAGE_LOADED](state, val) {
    state.loaded = val;
  },

  [types.STORE_FETCHED_PAGES](state, data) {
    state.all = data.pages;
  },

  [types.PAGES_LOADED](state, val) {
    state.loaded = val;
  },
};

// getters
const getters = {
  pageLoaded: state => state.loaded,
  page: state => state.page,
  somePages: state => limit => {
    if (state.all.length < 1) {
      return false;
    }
    let all = [...state.all];
    return all.splice(0, Math.min(limit, state.all.length));
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
