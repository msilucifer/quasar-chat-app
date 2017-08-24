<template>
  <div id="body">
    <s-chat slot="chat"></s-chat>
  </div>
</template>

<script>
import SChat from './Chat';

import { QLayout } from 'quasar';

export default {
  components: { SChat, QLayout }
}
</script>

<style>
#body {
  height: 200vh;
}
</style>
