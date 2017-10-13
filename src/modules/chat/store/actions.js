import * as TYPES from './mutation-types';

export const resolveQueuedMessages = ({ commit, state }) => {
  setTimeout(() => {
    commit('SEND_MESSAGES');
  }, 600);
};
