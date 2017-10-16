<template>
  <div>
    <div
      v-if="opened"
      id="chat"
      class="fixed-bottom-right animate-scale">
      <q-btn
        v-if="$q.platform.is.mobile"
        round
        color="primary"
        class="fixed-top-right mobile-close-btn"
        @click="toggleChat"
      >
        <q-icon name="close"/>
      </q-btn>
      <div class="chat status">
        <div 
          v-for="(message, id) in messages"
          :key="id"
        >
          <chat
            :id="message.id"
            :label="message.label"
            :side="message.side"
            :text-color="message.textColor"
            :bg-color="message.bgColor"
            :name="message.name"
            :avatar="message.avatar"
            :text="message.text"
            :status="message.info"
            class="animate-scale"
          >
          </chat>
        </div>
        <chat-spinner v-if="isSupportTyping" :avatar="this.support.src"/>
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
            @input="notifyClientIsTyping(), visualizeMessage()"
            @focus="visualizeMessage()"
            @keyup.enter="submit()"
            :after="[{ icon: 'send', handler() { submit() } }]"
          />
        </q-field>
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
      v-if="($q.platform.is.mobile && !opened) || $q.platform.is.desktop"
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
    {{ chatBtnStatus }}
    <pre>
      {{ $store.state.chat.messages }}
    </pre>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    data,
    methods,
    computed,
    components
  } from './options'

  import VueScrollTo from 'vue-scrollto';
  import { validationMixin } from 'vuelidate';
  import {
    required,
    minLength,
    maxLength,
    email,
    between
  } from 'vuelidate/lib/validators';
  
  import './assets/style/chat.css';

  Vue.use(VueScrollTo);

  export default {
    name: 's-chat',
    components,
    data,
    props: {
      support: {
        type: Object,
        required: true
      }
    },
    methods,
    computed,
    created() {
      const id = this.generateUId();

      function getHour(fixZero) {
        const d = new Date();
        const h = fixZero(d.getHours());
        const m = fixZero(d.getMinutes());
    
        return h + 'h' + m;
      }

      this.$store.commit('chat/PUSH_WELCOME_MESSAGE', {
        text: this.support.message,
        id: id,
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
      this.resolveQueuedMessages();
      this.deliverMessage();
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
