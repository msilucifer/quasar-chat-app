<template>
  <div class="q-message-text" :class="messageClass">
    <span class="q-message-text-content" :class="textClass">          
      <q-spinner-dots size="2em"/>
    </span>
  </div>
</template>

<script>
export default {
  name: 'chat-spinner',
  props: {
    textClass: Object,
    textColor: String,
    bgColor: String
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
