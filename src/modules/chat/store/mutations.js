import * as TYPES from './mutation-types';
import { state } from './state';

function isMessageValid (message) {
  if (!message) return false;
  if (typeof message === 'object') {
    if (message.id === undefined || typeof message.id === 'undefined' || message.id === undefined) return false;
    if (message.text === undefined || message.text === '' || message.text === ' ') return false;
    if (Array.isArray(message.text) === false || message.text.length === 0) return false;
    if (message.name === '' || message.name === undefined) return false;
    if (message.info.type === undefined || typeof message.info.type !== 'number') return false;

    return true;
  }

  return false;
}

function isMessageAlreadyQueued() {
  let arr = [...arguments]
    
  return arr.shift().filter( y => arr.every(
    x => x.some( j => j.id !== y.id
  )));
}

export default {
  [TYPES.QUEUE_UNREAD_MESSAGES](state, messages){
     messages.forEach(function(message) {
       if (message.info.sent === false) state.toBeRead.push(message);
    }, this);
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
	},
	[TYPES.SEND_OVER_HTTP](state, payload) {
		axios.get(`http://localhost:3000/`)
		.then(response => {
			// JSON responses are automatically parsed.
			console.log(response, 'r');
		})
		.catch(e => {
			console.log(e);
		});
	}
};
