import * as TYPES from './mutation-types';
import { state } from './state';

export default {
	[TYPES.PUSH_ONLY_MESSAGE](state, message) {
		// console.log(TYPES)
		state.messages.push(message);
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
		console.log(payload);
	}
};