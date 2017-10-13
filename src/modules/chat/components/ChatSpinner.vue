<template>
  <div>
    <img class="q-message-avatar" :src="avatar">   
    <q-spinner-dots size="2em"/>
  </div>
</template>

<script>
import { QSpinnerDots } from 'quasar';

export default {
  name: 'chat-spinner',
  components: {
    QSpinnerDots
  },
  props: {
    avatar: {
      type: String,
      required: true,
      default: 'statics/me.png'
    },
    classes: Object,
    color: String,
    bgColor: { 
      type: String,
      default: 'grey'
    }
  },
  computed: {
    textClass () {
      if (this.textColor) {
        return `text-${this.textColor}`
      }
    },
    messageClass () {
      if (this.bgColor) {
        return `text-${this.bgColor}`
      }
    }
  }
}
</script>
