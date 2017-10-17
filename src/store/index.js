import state from './state';
import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

import chat from '../modules/chat/store';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state,
  modules: { chat },
  mutations,
  actions,
  getters
});
