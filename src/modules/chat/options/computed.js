import { mapState, mapGetters } from 'vuex';

export default {
  chatBtnStatus() {
    if (!this.chatStatus){
      this.elmsState.chatBtn.color = 'dark';
    }
  },
  opened() {
    return this.$store.state.chat.opened;
  },
  message: {
    get() {
      return this.$store.state.chat.message;
    },
    set(value) {     
      this.$store.commit('chat/UPDATE_MESSAGE', value);
    }
  },
  name: {
    get() {
      return this.$store.state.chat.customer.name;
    },
    set(value) {
      this.$store.commit('chat/UPDATE_NAME', value);
    }
  },
  email: {
    get() {
      return this.$store.state.chat.customer.email;
    },
    set(value) {
      this.$store.commit('chat/UPDATE_EMAIL', value);
    }
  },
  phone: {
    get() {
      return this.$store.state.chat.customer.phone;
    },
    set(value) {
      this.$store.commit('chat/UPDATE_PHONE', value);
    }
  },
  isSupportTyping() {
    return this.$store.state.chat.isTyping.support;
  },
  isClientTyping() {
    return this.$store.state.chat.isTyping.client;
  },
  ...mapState({
    messages: state => state.chat.messages
  })
};
