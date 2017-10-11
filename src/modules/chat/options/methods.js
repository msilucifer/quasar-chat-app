import axios from 'axios';
import { default as cmptd } from './computed';
import { mapActions } from 'vuex';
import { Vuelidate } from 'vuelidate';

const touchMap = new WeakMap();

export const methods = {
  toggleChat() {
    let icon = this.elmsState.chatBtn.icon.name;
    
    if (this.opened === true && icon === 'close') {
      setTimeout(() => {
        return this.elmsState.chatBtn.icon.name = 'chat';
      }, 100);
    }
    
    if (this.opened === false && icon === 'chat') {
      setTimeout(() => {
        return this.elmsState.chatBtn.icon.name = 'close';
      }, 100) ;
    }
    
    this.classes.chatBtnIcon['animate-scale'] = true;
    this.$store.state.chat.opened = !this.$store.state.chat.opened;

    this.closePopupStatus();
  },
  openChat() {
    this.elmsState.chatBtn.icon.name = 'close';        
    this.opened = true;  
  },
  closeChat() {
    this.elmsState.chatBtn.icon.name = 'chat';
    this.opened = false;
  },
  open() {
    this.elmsState.chatBtn.icon.name = 'close';
    this.$store.commit('chat/OPEN_CHAT');
  },
  close() {
    this.elmsState.chatBtn.icon.name = 'chat';
    this.$store.commit('chat/CLOSE_CHAT');
  },
  notifyClientIsTyping() {
    this.$store.commit('chat/NOTIFY_CLIENT_IS_TYPING');
  },
  submit() {
    if (this.$q.platform.is.mobile) {
      this.$scrollTo('#message', 600, {
        container: '#chat',
        easing: 'ease-in',
        cancelable: false, 
        offset: -100
      })
    }
    
    if (this.name && this.email && this.phone && this.message.replace(/\n/gi, '')) {
      this.$store.commit('chat/PUSH_ONLY_MESSAGE', {
        id: this.generateUId(),
        name: 'You',
        text: [this.message],
        avatar: '../../statics/me.png',
        side: true,
        info: {
          type: 1,
          stamp: new Date().getTime(),
          sent: false,
          seen: false,
          delivered: false
        }
      });
      this.$store.commit('chat/IS_SUPPORT_TYPING');    
      setTimeout(() => {
        this.$store.commit('chat/PUSH_ONLY_MESSAGE',{
          id: this.generateUId(),
          name: 'SatTrack',
          text: ['Hey, we\'re gonna e-mail you or send a message to you soon, then stick around!'],
          avatar: '../../statics/me.png',
          side: false,
          info: {
            type: 0,
            stamp: new Date().getTime(),
            sent: false,
            seen: false,
            delivered: false
          },
          bgColor: 'primary',
          textColor: 'white'
        });
        this.$scrollTo('#message', 500, {
          container: '#chat',
          easing: 'ease-in',
          cancelable: false
        });
      }, 2400);
      this.$scrollTo('#message', 500, {
        container: '#chat',
        easing: 'ease-in',
        cancelable: false
      });
    }

    this.$refs.message.focus(); 
  },
  openPopupStatus() {
    this.popup = true;
  },
  closePopupStatus() {
    this.popup = false;
  },
  handlers(event, payload) {
    console.log(event, payload);
  },
  generateUId() {
    return (Date.now() + Math.random().toString(36).substr(2, 100)).toString(36);
  },
  delayTouch($v) {
    $v.$reset();
    
    if (touchMap.has($v)) {
      clearTimeout(touchMap.get($v));
    }
    
    touchMap.set($v, setTimeout($v.$touch, 7000));
  },
  showMessageInput() {
    this.$scrollTo('#message', 600, {
      container: '#chat',
      easing: 'ease-in',
      cancelable: false,
      offset: -100
    });
    
    if (this.name && this.email && this.$q.platform.is.mobile) {
      return this.isInputHided = false;
    }
  },
  ...mapActions({ 
    send: 'PUSH_ONLY_MESSAGE'
  })
};

export const computed = cmptd;
