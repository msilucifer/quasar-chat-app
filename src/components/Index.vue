<template>
  <div id="body">
    <s-chat :support="support" slot="chat"></s-chat>
  </div>
</template>

<script>
import SChat from '../modules/chat/ChatMessage';
import { QLayout } from 'quasar';

export default {
  components: { SChat, QLayout },
  data() {
    return {
      support: {
        name: 'Daniel Piva',
        src: 'https://avatars3.githubusercontent.com/u/26178791',
        message: ['Hi, there! What can I help with?']
      }
    }
  }
}
</script>

<style>
#body {
  margin: 0;
  width: 100%;
  height: 200vh;
}
</style>
