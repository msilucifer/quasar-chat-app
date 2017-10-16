<template>
  <div
    class="q-message"
    :class="{
      'q-message-sent': side,
      'q-message-received': !side
    }"
  >
    <p v-if="label" class="q-message-label text-center">{{ label }}</p>
    <div v-if="avatar" class="q-message-container row items-end no-wrap">
      <slot name="avatar">
        <img class="q-message-avatar" :src="avatar">
      </slot>
      <div class="column">
        <div v-if="name" class="q-message-name">{{ name }}</div>
        <div
          v-for="(msg, index) in text"
          :key="index"
          class="q-message-text"
          :class="messageClass"
        >
          <span class="q-message-text-content" :class="textClass">
            <p>{{ msg }}</p>
            <chat-stamp :props="{ status, id }" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatStamp from './ChatStamp';

export default {
  name: 'chat',
  components: {
    ChatStamp
  },
  props: {
    id: String,
    side: Boolean,
    label: String,
    bgColor: String,
    textColor: String,
    name: String,
    avatar: String,
    text: Array,
    status: Object
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
