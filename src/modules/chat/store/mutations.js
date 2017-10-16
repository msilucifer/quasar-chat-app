import * as TYPES from './mutation-types';
import { state } from './state';

function isMessageValid (message) {
  if (!message) return false;
  if (typeof message === 'object') {
    if (message.id === undefined || typeof message.id === 'undefined') return false;
    if (message.text === undefined || message.text === '' || message.text === ' ') return false;
    if (Array.isArray(message.text) === false || message.text.length === 0) return false;
    if (message.name === '' || message.name === undefined) return false;
    if (message.info.type === undefined || typeof message.info.type !== 'string') return false;

    return true;
  }

  return false;
}

function interval(online, offline) {
  if (typeof online === 'number' && typeof offline === 'number') {
    if (navigator.onLine) return online;
    else return offline;
  }

  return 500;
}

function getClientMessages(message) {
  return message.info.type === 'client';
}

function getUnsentMessages(message) {
  return message.info.sent.state === false;
}

function getUnseenMessages(message) {
  return message.info.seen.state === false;
}

function getNotDeliveredMessages(message) {
  return message.info.delivered.state === false;
}

function mockForDeliveredMessages(message) {
  message.info.delivered.state = true;
  message.info.delivered.at = Date.now();
}

function sendUnsentMessages(message) {
  message.info.sent.state = true;
  message.info.sent.at = Date.now();
}

function visualizeUnseenMessages(message) {
  message.info.seen.state = true;
  message.info.seen.at = Date.now();
}

export default {
  [TYPES.SEND_MESSAGES](state) {    
    setInterval(() => {
      state.messages
      .filter(getUnsentMessages)
      .filter(getClientMessages)
      .map(sendUnsentMessages);
    }, interval(2000, 2000));
  },
  [TYPES.VISUALIZE_MESSAGE](state) {
    state.messages
    .filter(getClientMessages)
    .filter(getUnseenMessages)
    .map(visualizeUnseenMessages);
  },
  [TYPES.DELIVER_MESSAGES](state){
    setInterval(() => {
      state.messages
      .filter(getClientMessages)
      .filter(getNotDeliveredMessages)
      .map(mockForDeliveredMessages);
    }, 3000);
  },
  [TYPES.PUSH_WELCOME_MESSAGE](state, welcomeMessage) {
    if (state.welcomeMessage === false) {
      state.welcomeMessage = true;
      state.messages.push(welcomeMessage);

      return;
    }
  },
	[TYPES.PUSH_ONLY_MESSAGE](state, message) {
    if (isMessageValid(message)) {
      state.messages.push(message);
      state.message = '';
    }
	},
	[TYPES.PUSH_CUSTOMER_INFO](state, data) {
		state.customer.name = data.name;
		state.customer.email = data.email;
		state.customer.phone = data.phone;
	},
	[TYPES.UPDATE_MESSAGE](state, message) {
		state.message = message;
	},
	[TYPES.UPDATE_NAME](state, name) {
		state.customer.name = name;
	},
	[TYPES.UPDATE_EMAIL](state, email) {
		state.customer.email = email;
	},
	[TYPES.UPDATE_PHONE](state, phone) {
		state.customer.phone = phone;
	},
	[TYPES.READ_MESSAGE](state, payload) {
		// console.log(payload);
	},
	[TYPES.TOGGLE_CHAT](state) {
		return state.opened = !state.opened;
	},
	[TYPES.OPEN_CHAT](state) {
		return state.opened = true;
	},
	[TYPES.CLOSE_CHAT](state) {
		return state.opened = false;
	},
	[TYPES.IS_SUPPORT_TYPING](state) {
		state.isTyping.support = true;
		setTimeout(() => {
			return state.isTyping.support = false;
		}, 1600);
	},
	[TYPES.NOTIFY_CLIENT_IS_TYPING](state) {
		state.isTyping.client = true;
		setTimeout(() => {
			state.isTyping.client = false;
		}, 1600);
	}
};
