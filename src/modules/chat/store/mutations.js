import * as TYPES from './mutation-types';
import { state } from './state';

export default {
  [TYPES.PUSH_WELCOME_MESSAGE](state, welcomeMessage) {
    if (state.welcomeMessage === false) {
      state.welcomeMessage = true;
      state.messages.push(welcomeMessage);

      return;
    }
  },
	[TYPES.PUSH_ONLY_MESSAGE](state, message) {
    if (message.name !== '' && Array.isArray(message.text) === true) {
      state.messages.push(message);
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
