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
    this.visualizeMessage();
  },
  close() {
    this.elmsState.chatBtn.icon.name = 'chat';
    this.$store.commit('chat/CLOSE_CHAT');
  },
  notifyClientIsTyping() {
    this.$store.commit('chat/NOTIFY_CLIENT_IS_TYPING');
  },
  visualizeMessage() {
    this.$store.commit('chat/VISUALIZE_MESSAGE');
  },
  submit() {
    function getHour(fixZero) {
      const d = new Date();
      const h = fixZero(d.getHours());
      const m = fixZero(d.getMinutes());
  
      return h + 'h' + m;
    }

    this.id = this.generateUId();
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
        id: this.id,
        name: this.name,
        text: [this.message],
        avatar: '../../statics/me.png',
        side: true,
        info: {
          type: 'client',
          stamp: getHour(this.fixZero),
          sent: {
            state: false,
            at: null
          },
          seen: {
            state: false,
            at: null
          },
          delivered: {
            state: false,
            at: null
          }
        }
      });
      this.$store.commit('chat/IS_SUPPORT_TYPING');
      setTimeout(() => {
        this.$store.commit('chat/PUSH_ONLY_MESSAGE',{
          id: this.id + 'oi',
          name: this.support.name,
          text: ['Hey, we\'re gonna e-mail you or send a message to you soon, then stick around!'],
          avatar: this.support.src,
          side: false,
          info: {
            type: 'support',
            stamp: getHour(this.fixZero),
            sent: {
              state: true,
              at: null
            },
            seen: {
              state: false,
              at: null
            },
            delivered: {
              state: true,
              at: null
            }
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
  fixZero(time) {
    if (time < 10) {
      time = "0" + time;
    }
    
    return time;
  },
  ...mapActions({ 
    resolveQueuedMessages: 'chat/resolveQueuedMessages',
    deliverMessage: 'chat/deliverMessage'
  })
};

export const computed = cmptd;
