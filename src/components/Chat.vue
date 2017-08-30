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
      <div class="chat status">
        <div 
          v-for="(message, id) in messages"
          :key="id"
        >
          <q-chat-message
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
          <q-icon class="message-status message-status-right-side" name="done all"/ >
        </div>

        <q-chat-message
          v-if="isClientTyping"
          :sent="true"
          text-color="black"
          bg-color="grey-"
          name="name"
          avatar="statics/boy-avatar.png"
          class="animate-scale"
        >
          <q-spinner-dots size="2em" />
        </q-chat-message>
        <q-chat-message
          v-if="isSupportTyping"
          :sent="false"
          text-color="black"
          bg-color="grey-"
          name="name"
          avatar="statics/boy-avatar.png"
          class="animate-scale"
        >
          <q-spinner-dots size="2em" />
        </q-chat-message>
        <div class="inputs" v-if="messages.length <= 2">
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
      </div>
      <div id="message" style="height: 1px"></div>
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
            @keyup.enter="submit"
            @input="hideChatBtn(), whenClientIsTyping()"
            @blur="showChatBtn(), whenClientIsNotTyping()"
          />
        </q-field>
        <q-btn
          no-caps
          ref="btn"
          :color="btnState.submitBtn.color"
          :class="classes.sendBtn"
          @click="submit"
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
      :color="btnState.chatBtn.btn.color"
      class="send fixed-bottom-right animate-pop"
      :class="classes.chatBtn"
      style="margin: 0 32px 32px 0"
      @click="toggleChat()"
    >
      <q-icon
        :color="btnState.chatBtn.icon.color"
        :name="btnState.chatBtn.icon.name"
        :class="classes.chatBtnIcon"
      />
    </q-btn>
    {{chatBtnStatus}}
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
        isClientTyping: false,
        isSupportTyping: false,
        popup: true,
        btnState: {
          chatBtn: {
            icon: {
              name: 'chat',
              color: 'white'
            },
            btn: {
              name: '',
              color: 'primary',
            }
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
          },
          sendBtn: {
            'full-width': true,
          }
        },
        messages: [
          {
            label: 'Offline'
          },
          {
            name: 'SatTrack',
            text: ['Hi, there, we\'re not online now ); but feel free to text us whenever you need. We will text you back as soon as we can!'],
            sent: false,
            avatar: 'https://meusanimais.com.br/wp-content/uploads/2015/03/4-gato-enfermo.jpg',
            stamp: 'Yesterday 13:34',
            bgColor: 'grey'          
          }
        ]
      }
    },
    methods: {
      toggleChat() {
        let icon = this.btnState.chatBtn.icon.name;

        if (this.opened === true && icon === 'close') {
          setTimeout(() => {
            return icon = 'chat';
          }, 100);
        }

        if (this.opened === false && this.icon === 'chat') {
          setTimeout(() => {
            return icon = 'close';
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
        if (this.name && this.email && this.phone && !this.$v.message.$invalid) {
          this.messages.push({
            name: 'You',
            text: [this.message],
            sent: true,
            avatar: 'statics/boy-avatar.png',
            stamp: 'Yesterday 13:34',
          });

          this.messages.push({
            name: 'SatTrack',
              text: ['Hey, we\'re gonna e-mail you or send a message to you soon, then stick around!'],
              sent: false,
              avatar: 'https://meusanimais.com.br/wp-content/uploads/2015/03/4-gato-enfermo.jpg',
              stamp: 'Yesterday 13:34',
            });

          this.message = '';

          this.$scrollTo('#message', 500, {
            container: '#chat',
            easing: 'ease-in',
            // offset: 5000
          });
          this.sendBtnToggle();
        }
        this.$scrollTo('#message', 500, {
          container: '#chat',
          easing: 'ease-in',
          // offset: 5000
        });
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
      },
      whenClientIsTyping() {
        const client = this.isClientTyping;

        if (!client) {
          return setTimeout(() => {
            this.isClientTyping = true;

            this.$scrollTo('#message', 200, {
              container: '#chat',
              easing: 'ease-in'
            });
          }, 300);
          setTimeout(() => {
            this.whenClientIsNotTyping();
          }, 3000);
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

            this.$scrollTo('#message', 200, {
              container: '#chat',
              easing: 'ease-in'
            });
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
    },
    computed: {
      chatBtnStatus() {
        if (!this.chatStatus){
          this.btnState.chatBtn.color = 'dark';
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
    max-height: 70vh;
    min-height: 580px;
    overflow: auto;
    overflow-x: hidden;
    border-radius: 0.4em;
    border: 1px solid #e9e9e9;
    box-shadow: 0px 0px 40px -15px rgba(0,0,0,0.4);
  }

  .chat {
    padding: 24px;
  }

  .inputs {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #efefef;
  }

  #message {
    margin-bottom: 172px;
    padding: 0;
  }

  .message {
    width: 370px;
    margin-right: 30px;
    margin-bottom: 113px;
    padding: 24px;
    border-top: 1px solid #efefef;
    background: #ffffff;
  }

  .message-status {
    padding: 12px;
  }

  .message-status-left-side {
    margin-left: 38px;
  }

  .message-status-right-side {
    margin-left: 236px;
  }

  .full-width {
    width: 100%;
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

    #message {
      margin-bottom: 178px;
    }

    .message {
      width: 100%;
      margin-bottom: 0; 
      margin-right: 0 !important; 
      padding: 24px;
    }

    .message-status-right-side {
      margin-left: 600px;
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
