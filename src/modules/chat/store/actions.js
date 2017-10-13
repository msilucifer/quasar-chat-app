import * as TYPES from './mutation-types';

export const resolveQueuedMessages = ({ commit, state }) => {
  setTimeout(() => {
    commit('RESOLVE_QUEUED_MESSAGES');
  }, 600);
};
