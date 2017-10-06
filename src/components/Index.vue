<template>
  <div id="body">
    <s-chat :isOnline="false" slot="chat"></s-chat>
  </div>
</template>

<script>
import SChat from '../modules/Chat/Chat';

import { QLayout } from 'quasar';

export default {
  components: { SChat, QLayout }
}
</script>

<style>
#body {
  margin: 0;
  width: 100%;
  height: 200vh;
}
</style>
