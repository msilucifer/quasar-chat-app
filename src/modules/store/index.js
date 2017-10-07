import state from '../store/state';
import mutations from '../store/mutations';
import * as actions from '../store/actions';
import * as getters from '../store/getters';

import chat from '../chat/store';

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
