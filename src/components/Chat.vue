<template>
  <div>
    <q-layout>
      <div v-if="isVisible" id="chat" class="fixed-bottom-right">
        <div v-if="isOnline">
          <q-chat-message
            v-for="msg in messages"
            :key="msg"
            :label="msg.label"
            :sent="msg.sent"
            :text-color="msg.textColor"
            :bg-color="msg.bgColor"
            :name="msg.name"
            :avatar="msg.avatar"
            :text="msg.text"
            :stamp="msg.stamp"
          />

          <q-chat-message
            name="Vladimir"
            avatar="../statics/boy-avatar.png"
          >
            <q-spinner-dots size="2rem" />
          </q-chat-message>
        </div>
        <div v-if="!isOnline" style="max-width:300px;">
          <h3 style="color:#212121;">Hi, there!</h3>
          <p style="color:#333;">It looks like someone is having some sleep, but you can send a message anyway! We will reply you as soon as we can, we just need to some stuffs about you :)</p>
        </div>
        <div>
          <q-input
            v-model="name"
            stack-label="How can I call you?"
          />
          <q-input
            type="email"
            v-model="email"
            stack-label="What's your best e-mail?"
          />
          <div>
            <q-input
              type="textarea"
              v-model="message"
              stack-label="How can I help you with?"
            />
            <q-btn
              loader
              :color="btnState.color"
              style="width: 100%; margin-top: 8px;"
              @click="submit()"
            >

              <q-icon size="1.8em" :name="btnState.icon"/>
            </q-btn>
          </div>
        </div>
      </div>
    </q-layout>
    <q-btn 
      round
      color="primary"
      class="fixed-bottom-right animate-pop"
      style="margin: 0 24px 24px 0"
      @click="toggleChat"
    >
      <q-icon color="white" name="chat" />
    </q-btn> 
  </div>
</template>

<script>
import {
  QLayout,
  QInput, 
  QFixedPosition,
  QChatMessage,
  QSpinnerDots,
  QBtn,
  QIcon
} from 'quasar';

export default {
  name: 's-chat',
  components: {
    QLayout,
    QInput, 
    QFixedPosition,
    QChatMessage,
    QSpinnerDots,
    QBtn,
    QIcon
  },
  data() {
    return {
      name: '',
      email: '',
      message: '',
      isVisible: true,
      isOnline: false,
      btnState: {
        icon: 'send',
        color: 'primary'
      },
      messages:
      {
        message: {
          text: ['kdfsfsdjfd', 'sdjfsdfjh', 'sajdhsdkfgsdhfdsgkfhsadgk'],
          label: 'Lable',
          name: 'name',
          avatar: '../statics/boy-avatar.png'
        },
        message2: {
          text: ['kdfsfsdjfd', 'sdjfsdfjh', 'sajdhsdkfgsdhfdsgkfhsadgk'],
          label: 'Lable',
          name: 'name',
          avatar: '../statics/boy-avatar.png'
        },
        message3: {
          text: ['kdfsfsdjfd', 'sdjfsdfjh', 'sajdhsdkfgsdhfdsgkfhsadgk'],
          label: 'Lable',
          name: 'name',
          avatar: '../statics/boy-avatar.png'
        }
      }
    }
  },
  methods: {
    toggleChat() {
      return this.isVisible = !this.isVisible;
    },
    submit(event, done) {
      setTimeout(() => {
        this.btnState.icon = "check";
        this.btnState.color = "positive";
      }, 300);
      done();
    }
  }

}
</script>

<style scoped>
#chat {
  margin-bottom: 112px;
  margin-right: 24px;
  min-width: 22%;
  max-height: 60vh;
  padding: 24px;
  overflow: auto;
  overflow-x: hidden;
  border-radius: 0.4em;
  box-shadow: 0px 0px 40px -15px rgba(0,0,0,0.9);
}
</style>
