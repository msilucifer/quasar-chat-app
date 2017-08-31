<template>
  <div>
    <div
      v-if="opened"
      id="chat"
      class="fixed-bottom-right animate-scale">
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
          >
          </q-chat-message>
        </div>
        <q-chat-message
          v-if="false"
          :sent="false"
          text-color="black"
          bg-color="grey-"
          name="name"
          avatar="statics/me.png"
          class="animate-scale"
        >
          <q-spinner-dots size="1.8em" />
        </q-chat-message>
        <q-chat-message
          v-if="isSupportTyping"
          :sent="false"
          text-color="black"
          bg-color="grey-"
          name="name"
          avatar="statics/me.png"
          class="animate-scale"
        >
          <q-spinner-dots size="2em" />
        </q-chat-message>
        <div
          class="inputs"
          v-if="messages.length <= 1"
        >
          <small class="caption">About you</small>
          <q-field>
            <q-input
              v-model="name"
              stack-label="How can I call you?"
              @focus="showMessageInput()"
            />
          </q-field>
          <q-field
            :error="$v.email.$error" 
            error-label="Please, fill out your e-mail."
            @focus="showMessageInput()"
          >
            <q-input
              type="email"
              v-model="email"
              stack-label="What's your best e-mail?"
              @focus="delayTouch($v.email), showMessageInput()"          
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
              @focus="delayTouch($v.number), showMessageInput()" 
            />
          </q-field>
        </div>
      </div>
      <div id="message" style="height: 1px"></div>
      <div
        class="message fixed-bottom-right"
        v-if="!$q.platform.is.mobile || !isInputHided || $q.platform.is.desktop"
      >
        <q-field
          :error="$v.message.$error" 
          error-label="Some error."
          class="mobile-input"
        >
          <q-input
            color="dark"
            type="textarea"
            ref="message"
            class="message-input"
            v-model="message"
            float-label="What's your message?"
            @keyup.enter="submit()"
            @input="hideChatBtn(), whenClientIsTyping()"
            @blur="showChatBtn(), whenClientIsNotTyping()"
            :after="[{ icon: 'send',handler() { submit() } }]"
          />
        </q-field>
        <q-btn
          v-if="false"        
          ref="btn"
          class="mobile-btn"
          no-caps
          rounded
          :color="elmsState.submitBtn.color"
          :class="classes.sendBtn"
          @click="submit"
          :disabled="elmsState.submitBtn.status"
        >
          <span>{{ elmsState.submitBtn.name }}</span>
          <q-icon
            size="1.8em"
            style="padding: 4px 8px"
            :name="elmsState.submitBtn.icon"
          />
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
      v-if="true"
      round
      :color="elmsState.chatBtn.btn.color"
      class="send fixed-bottom-right animate-pop"
      :class="classes.chatBtn"
      style="margin: 0 32px 32px 0"
      @click="toggleChat()"
    >
      <q-icon
        :color="elmsState.chatBtn.icon.color"
        :name="elmsState.chatBtn.icon.name"
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
        name: '',
        email: '',
        phone: '',
        message: '',
        opened: false,
        chatStatus: true,
        isClientTyping: false,
        isSupportTyping: false,
        popup: false,
        isInputHided: true,
        elmsState: {
          chatBtn: {
            icon: {
              name: 'chat',
              color: 'white'
            },
            btn: {
              name: '',
              color: 'grey',
              class: {
                'mobile-btn': true,
                'full-width': false
              }
            }
          },
          submitBtn: {
            icon: 'send',
            color: 'primary',
            name: '',
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
            'full-width': false,
            'mobile-btn': true
          }
        },
        messages: [
          {
            label: 'Offline',
            name: 'SatTrack',
            text: ['Hi, there, we\'re not online now ); but feel free to text us whenever you need. We will text you back as soon as we can!'],
            sent: false,
            avatar: 'statics/me.png',
            stamp: 'Yesterday 15:54',
            bgColor: 'grey',
            state: {
              name: 'done',
              color: 'positive',
              sent: true,
              side: false
            }  
          }
        ]
      }
    },
    methods: {
      toggleChat() {
        let icon = this.elmsState.chatBtn.icon.name;

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
        let submitBtn = this.elmsState.submitBtn;
        if (this.message) {
          submitBtn.icon = "check";
          submitBtn.color = "positive";
          submitBtn.name = 'Sent';
          // submitBtn.status = !submitBtn.status;

          setTimeout(() => {
            submitBtn.icon = "send";
            submitBtn.color = "primary";
            submitBtn.name = 'Send';
            // submitBtn.status = !submitBtn.status;
          }, 700);
        }
      },
      submit() {
        if (this.name && this.email && this.phone && this.message.replace(/\n/gi, '')) {
          this.messages.push({
            name: 'You',
            text: [this.message],
            sent: true,
            avatar: 'statics/me.png',
            stamp: '<div style="width:100%;" class="animate-scale flex items-center justify-end"><span>Ontem às 10:13 </span><i aria-hidden="false" style="margin-left:4px; font-size: 1.2em;" class="q-icon material-icons text-positive flex">done_all</i></div>',
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
                avatar: 'statics/me.png',
                stamp: 'Yesterday 13:34',
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
          this.sendBtnToggle();

          this.message = '';
        }
        
        this.$refs.message.focus(); 
        this.whenClientIsNotTyping();
      },
      sendMessage(message) {
          
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
      showMessageInput() {
        this.$scrollTo('#message', 600, {
          container: '#chat',
          easing: 'ease-in',
          cancelable: false,
          offset: -350
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
      }
    },
    computed: {
      chatBtnStatus() {
        if (!this.chatStatus){
          this.elmsState.chatBtn.color = 'dark';
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
    margin-bottom: 102px;
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
    margin-bottom: 103px;
    padding: 24px;
    border-top: 1px solid #efefef;
    background: #ffffff;
  }

  .message-status {
    margin-left: 252px;
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

  .mobile-input {
    float: left;
    width: 100%;
  }

  .mobile-btn {
    margin-left: 4px;
    margin-top: 28px;
  }
  
  @media (max-width: 768px) {
    #chat {
      margin: 0;
      width: 100%;
      max-width: 100%;
      min-width: 100%;
      min-height: 100vh;
      max-height: 100vh;
      padding-top: 48px;
      border-radius: 0;
    }

    .status {
      padding-top: 24px;
    }

    #message {
      margin-bottom: 132px;
    }

    .message {
      width: 100%;
      margin-top: 0;
      margin-bottom: 0; 
      margin-right: 0 !important; 
      padding: 12px;
    }

    .message-status {
      margin-left: 600px;
    }

    .mobile-input {
      margin: 0 !important;
      padding: 0 !important;
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

    #message {
      margin-bottom: 72px;
    }
  }

  @media (max-width: 315px) {
    .popup-status {
      display: none;
    }
  }
</style>
