import * as TYPES from './mutation-types';

export const pushMessage = ({ commit, state, dispatch }, message) => {
	dispatch('PUSH_ONLY_MESSAGE');
};