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
        class="fixed-top-right"
        style="z-index:100000000; margin:16px;"
        @click="toggleChat"
      >
        <q-icon name="close"/>
      </q-btn>
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
            :message="getMessage(id, message)"
          >
          </q-chat-message>
        </div>
        <q-chat-message
          v-if="isSupportTyping"
          :sent="false"
          text-color="black"
          bg-color="grey-"
          name="name"
          avatar="../../statics/me.png"
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
  import {
    mapActions,
    mapState,
    mapGetters
  } from 'vuex';

  import VueScrollTo from 'vue-scrollto';
  import { data, methods, computed } from './options'

  import {
    Vuelidate,
    validationMixin
  } from 'vuelidate';
  import {
    required,
    minLength,
    maxLength,
    email,
    between
  } from 'vuelidate/lib/validators';

  import Chat from '../../components/base/Xuxu';
  import './assets/style/chat.css';

  const touchMap = new WeakMap();

  Vue.use(VueScrollTo);

  console.log(Chat);

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
      }
    },
    data,
    methods,
    computed,
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