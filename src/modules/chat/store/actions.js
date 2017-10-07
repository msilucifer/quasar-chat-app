import * as TYPES from './mutation-types';

export const pushMessage = ({ commit, state, dispatch }, message) => {
	commit('PUSH_ONLY_MESSAGE');
};

export const readMessage = ({ state, commit }, payload) => {
	commit({ type: 'READ_MESSAGE', payload });
};