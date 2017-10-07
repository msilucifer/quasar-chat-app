import state from '../store/state';
import mutations from '../store/mutations';
import * as actions from '../store/actions';
import * as getters from '../store/getters';

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
