import * as TYPES from './mutation-types';

export const resolveQueuedMessages = ({ commit, state }, messageId) => {
  setTimeout(() => {
    commit('RESOLVE_QUEUED_MESSAGES', messageId);
  }, 600);
};
