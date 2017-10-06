import { mapActions } from 'vuex';

export default {
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

    this.classes.chatBtnIcon['animate-fade'] = true;
    this.opened = !this.opened;

    this.closePopupStatus();
  },
  openChat() {
    this.elmsState.chatBtn.icon.name = 'chat';        
    this.opened = true;  
  },
  closeChat() {
    this.elmsState.chatBtn.icon.name = 'chat';
    this.opened = false;
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
      this.messages.push({
        name: 'You',
        text: [this.message],
        sent: true,
        avatar: '../../statics/me.png',
        stamp: '<div style="width:100%;" class="animate-scale flex items-center justify-end"><span>' + new Date().getTime().toString() + '</span><i aria-hidden="false" style="margin-left:4px; font-size: 1.2em;" class="q-icon material-icons text-positive flex">done_all</i></div>',
        state: {
          name: 'done',
          color: 'positive',
          sent: true,
          side: true
        }
      });
      setTimeout(() => {
        this.isSupportTyping = true;

        setTimeout(() => {
          this.messages.push({
            name: 'SatTrack',
            text: ['Hey, we\'re gonna e-mail you or send a message to you soon, then stick around!'],
            sent: false,
            avatar: '../../statics/me.png',
            stamp: new Date().getTime().toString(),
            bgColor: 'primary',
            textColor: 'white',
            state: {
            state: {
              name: 'done',
              color: 'positive',
              sent: true,
              side: false
            }
          }
          });
          this.$scrollTo('#message', 500, {
            container: '#chat',
            easing: 'ease-in',
            cancelable: false
          });

          this.isSupportTyping = false;
        }, 1400);
      }, 1000);
      this.$scrollTo('#message', 500, {
        container: '#chat',
        easing: 'ease-in',
        cancelable: false
      });

      this.message = '';
    }
    
    this.$refs.message.focus(); 
    this.whenClientIsNotTyping();
  },
  openPopupStatus() {
    this.popup = true;
  },
  closePopupStatus() {
    this.popup = false;
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
  whenClientIsTyping() {
    const client = this.isClientTyping;

    if (!client) {
      setTimeout(() => {
        this.isClientTyping = true;

      }, 300);
      setTimeout(() => {
        this.whenClientIsNotTyping();
      }, 2000);

      return;
    }
  },
  whenClientIsNotTyping() {
    return setTimeout(() => {
      this.isClientTyping = false;
    }, 1500);
  },
  whenSupportIsTyping() {
    const support = this.isSupportTyping;

    if (!support) {
      return setTimeout(() => {
        this.isSupportTyping = true;
      }, 300);

      setTimeout(() => {
        this.whenSupportIsNotTyping();
      }, 3000);
    }
  },
  whenSupportIsNotTyping() {
    return setTimeout(() => {
      this.isSupportTyping = false;
    }, 1500);
  },
  ...mapActions({ 
    send: 'PUSH_ONLY_MESSAGE'
  }),
  getMessage(id, message) {
    this.$store.commit('chat/READ_MESSAGE', { id, message });
  }
};