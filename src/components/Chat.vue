<template>
  <div>
    <div v-if="opened" id="chat" class="fixed-bottom-right animate-scale">
      <q-toolbar
        v-if="$q.platform.is.mobile"
        style="z-index:10000000;"
        class="fixed-top"
      >
        <q-btn flat @click="toggleChat">
          <q-icon name="close"/>
        </q-btn>
        <q-toolbar-title>
          SatTrack Rastreamento e Logística
        </q-toolbar-title>
      </q-toolbar>
      <div v-if="chatStatus">
        <div
          class="chat mobile-chat"
          v-for="msg in messages"
          :key="msg"
        >
          <q-chat-message
            :label="msg.label"
            :sent="msg.sent"
            :text-color="msg.textColor"
            :bg-color="msg.bgColor"
            :name="msg.name"
            :avatar="msg.avatar"
            :text="msg.text"
            :stamp="msg.stamp"
          />

          <!-- <q-chat-message
            name="Vladimir"
            avatar="../statics/boy-avatar.png"
          >
            <q-spinner-dots size="2rem" />
          </q-chat-message> -->
        </div>
      </div>
      <div v-if="!chatStatus" class="chat status">
        <q-chat-message
          v-for="(message, id) in sentWhenOffline"
          :key="id"
          :label="message.label"
          :sent="message.sent"
          :text-color="message.textColor"
          :bg-color="message.bgColor"
          :name="message.name"
          :avatar="message.avatar"
          :text="message.text"
          :stamp="message.stamp"
          class="animate-scale"
        />
      </div>
      <div class="inputs" v-if="sentWhenOffline.length <= 2">
        <small class="caption">Info about you</small>
        <q-field>
          <q-input
            v-model="name"
            stack-label="How can I call you?"
          />
        </q-field>
        <q-field
          :error="$v.email.$error" 
          error-label="Please, fill out your e-mail."
        >
          <q-input
            type="email"
            v-model="email"
            stack-label="What's your best e-mail?"
            @focus="delayTouch($v.email)"          
          />
        </q-field>
        <q-field
          :error="$v.number.$error" 
          error-label="Please, fill out your phone number."
        >
          <q-input
            type="number"
            v-model="phone"
            stack-label="What's your phone number?"
            @focus="delayTouch($v.number)" 
          />
        </q-field>
      </div>
      <div class="message fixed-bottom-right">
        <q-field
          :error="$v.message.$error" 
          error-label="Some error."
        >
          <q-input
            ref="message"
            type="textarea"
            v-model="message"
            float-label="What's your message?"
            @focus="hideChatBtn()"
            @blur="showChatBtn()"
          />
        </q-field>
        <q-btn
          no-caps
          ref="btn"
          :color="btnState.submitBtn.color"
          style="width: 100%; margin-top: 8px;"
          @click="submit()"
          @keydown.enter="submit()"
          :disabled="btnState.submitBtn.status"
        >
          <span>{{ btnState.submitBtn.name }}</span>
          <q-icon
            size="1.8em"
            style="padding: 4px 8px"
            :name="btnState.submitBtn.icon"
          />
          <!-- <span slot="loading">Sending...</span> -->
        </q-btn>
      </div>
      <div id="message"></div>
    </div>
    <div
      v-if="chatStatus && popup"
      class="fixed-bottom-right flex popup-status"     
    >
      <p>We're online, start chating!</p>
      <q-btn flat @click="closePopupStatus()">
        <q-icon name="close"/>
      </q-btn>
    </div>
    <q-btn 
      round
      color="primary"
      class="fixed-bottom-right animate-pop"
      :class="classes.chatBtn"
      style="margin: 0 32px 32px 0"
      @click="toggleChat()"
    >
      <q-icon
        :color="btnState.chatBtn.color"
        :name="btnState.chatBtn.icon"
        :class="classes.chatBtnIcon"
      />
    </q-btn>
  </div>
</template>

<script>
import {
  QField,
  QInput, 
  QLayout,
  QToolbar,
  QToolbarTitle,
  QChatMessage,
  QSpinnerDots,
  QTransition,
  QFab,
  QBtn,
  QIcon
} from 'quasar';


import Vue from 'vue';
import VueScrollTo from 'vue-scrollto';

import { Vuelidate, validationMixin } from 'vuelidate';
import { required, minLength, maxLength, email, between } from 'vuelidate/lib/validators';

const touchMap = new WeakMap();

Vue.use(VueScrollTo);

export default {
  name: 's-chat',
  components: {
    QField,
    QInput,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QChatMessage,
    QSpinnerDots,
    QTransition,
    QFab,
    QBtn,
    QIcon
  },
  props: {
    open: {
      type: Boolean,
      required: false,
      default: false
    },
    isOnline: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      name: 'Daniel Piva',
      email: 'imdanielpiva@gmail.com',
      phone: 4384463775,
      message: 'Esta é a minha mensagem',
      opened: false,
      chatStatus: false,
      popup: true,
      btnState: {
        chatBtn: {
          icon: 'chat',
          color: 'white'
        },
        submitBtn: {
          icon: 'send',
          color: 'primary',
          name: 'Send',
          status: false
        }
      },
      classes:{
        chatBtn: {
          display: ''          
        },
        chatBtnIcon: {
          'animate-fade': false,
        }
      },
      messages: [
        {
          label: 'Online'
        },
        {
          name: 'Vladimir',
          text: ['How are you?'],
          sent: false,
          avatar: 'statics/boy-avatar.png',
          stamp: 'Yesterday 13:34'
        },
        {
          name: 'Jane',
          text: ['I\'m good, thank you!', 'And you?'],
          sent: true,
          textColor: 'white',
          bgColor: 'black',
          avatar: 'statics/linux-avatar.png',
          stamp: 'Yesterday at 13:50'
        }
      ],
      sentWhenOffline: [
        {
          label: 'Offline'
        },
        {
          name: 'SatTrack',
          text: ['Hi, there, we\'re not online now ); but feel free to text us whenever you need. We will text you back as soon as we can!'],
          sent: false,
          avatar: 'statics/boy-avatar.png',
          stamp: 'Yesterday 13:34',
          bgColor: 'grey'          
        }
      ]
    }
  },
  methods: {
    toggleChat() {
      if (this.opened === true && this.btnState.chatBtn.icon === 'close') {
        setTimeout(() => {
          return this.btnState.chatBtn.icon = 'chat';
        }, 100);
      }

      if (this.opened === false && this.btnState.chatBtn.icon === 'chat') {
        setTimeout(() => {
          return this.btnState.chatBtn.icon = 'close';
        }, 100) ;
      }

      this.classes.chatBtnIcon['animate-fade'] = true;
      this.opened = !this.opened;

      this.closePopupStatus();
      this.hideChatBtn();
      this.showChatBtn();
    },
    sendBtnToggle() {
      let submitBtn = this.btnState.submitBtn;
      if (this.message) {
        submitBtn.icon = "check";
        submitBtn.color = "positive";
        submitBtn.name = 'Sent';
        submitBtn.status = !submitBtn.status;

        setTimeout(() => {
          submitBtn.icon = "send";
          submitBtn.color = "primary";
          submitBtn.name = 'Send';
          submitBtn.status = !submitBtn.status;
        }, 500);
      }
    },
    submit() {
      if (this.name && this.email && this.phone && this.message) {
        this.sentWhenOffline.push({
          name: 'You',
          text: [this.message],
          sent: true,
          avatar: 'statics/boy-avatar.png',
          stamp: 'Yesterday 13:34',
        });

        setTimeout(() => {
          console.log('aqui')
          this.sentWhenOffline.push({
            name: 'SatTrack',
            text: ['Hey, we\'re gonna e-mail you or send a message to you soon, then stick around!'],
            sent: false,
            avatar: 'statics/boy-avatar.png',
            stamp: 'Yesterday 13:34',
          });
        }, 1000);

        this.message = '';

        this.$scrollTo('#message', 1000, {
          container: '#chat',
          easing: 'ease-in',
          offset: 20000
        });
        this.sendBtnToggle();
      }

      this.$refs.message.focus(); 
    },
    openPopupStatus() {
      return this.popup = true;
    },
    closePopupStatus() {
      return this.popup = false;
    },
    delayTouch($v) {
      $v.$reset();

      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }

      touchMap.set($v, setTimeout($v.$touch, 7000));
    },
    hideChatBtn() {
      if (this.$q.platform.is.mobile && this.opened) {
        return this.classes.chatBtn.display = 'none';
      }
    },
    showChatBtn() {
      if (this.$q.platform.is.mobile && !this.opened) {
        return this.classes.chatBtn.display = '';
      }
    }
  },
  mixins: [ validationMixin ],
  validations: {
    email: {
      required,
      email
    },
    number: {
      minLength: minLength(9),
      maxLength: maxLength(11),
    },
    message: {
      minLength: minLength(6),
      required
    }
  }
}
</script>

<style scoped>
#chat {
  margin-bottom: 112px;
  margin-right: 24px;
  width: 380px;
  height: 720px;
  max-height: 80vh;
  overflow: auto;
  overflow-x: hidden;
  border-radius: 0.4em;
  border: 1px solid #e9e9e9;
  box-shadow: 0px 0px 40px -15px rgba(0,0,0,0.4);
}

.chat {
  padding: 24px;
  margin-bottom: 132px;
}

.inputs {
  padding: 24px;
  margin-top: -172px;
  border-top: 1px solid #efefef;
}

.message {
  width: 372px;
  margin-right: 28px;
  margin-bottom: 114px;
  padding: 0 24px 24px 24px;
  /* border-top: 1px solid #efefef; */
  background: #ffffff;
}

.caption {
  color: #333;
  font-weight: bold;
  padding-bottom:4px;
  text-transform: uppercase;
  border-bottom: 2px solid #e9e9e9;
}

.popup-status {
  color: #ffffff !important;
  margin: 32px 112px;
  padding: 12px 12px 12px 32px;
  border-radius: .2em;
  background: rgb(33, 186, 69);
  -webkit-animation: q-bounce 2s infinite;
  animation: q-bounce 2s infinite;
}

.popup-status p {
  margin-top : 12px !important;
  margin-bottom : 12px !important;
  margin-right: 6px !important;
}

.display {
  display: none;
}

@media (max-width: 768px) {
  #chat {
    margin: 0;
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    min-height: 100vh;
    max-height: 100vh;
    border-radius: 0;
  }

  .status {
    padding-top: 24px;
  }
}

@media (max-width: 515px) {
  .popup-status {
    color: #ffffff !important;
    margin-bottom: 112px;
    margin-right: 32px;
    margin-left: 0;
    padding: 12px;
    border-radius: .2em;
    background: rgb(33, 186, 69);
    -webkit-animation: q-bounce 2s infinite;
    animation: q-bounce 2s infinite;
  }

  .mobile-chat {
    padding-top: 112px;
  }
}

@media (max-width: 315px) {
  .popup-status {
    display: none;
  }
}
</style>
