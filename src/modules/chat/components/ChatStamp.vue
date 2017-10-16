<template>
  <div
    class="q-message-stamp animate-scale"
  >
    {{ props.status.stamp }}
    <i 
      v-if="props.status.type === 'client'"    
      aria-hidden="false"
      class="q-icon material-icons stamp"
      :class="classes"
    >
    {{ messageStatus }}
    </i>
    <q-tooltip self="top left" anchor="bottom left" :delay="500">
      <span>Seen at: {{ props.status.stamp }}</span>
    </q-tooltip>
  </div>
</template>

<script>
import { QTooltip } from 'quasar' ;
export default {
  name: 'chatStamp',
  props: ['props'],
  components: {
    QTooltip
  },
  data() {
    return {
      classes: {
        'text-white': true,
        'text-grey': true
      }
    };
  },
  computed: {
    messageStatus() {
      const status = this.props.status;
      
      if (status.sent.state === false) return 'access_time';

      if (status.sent.state === true && status.delivered.state === false) return 'done';

      if (status.sent.state === true && status.seen.state == false && status.delivered.state === true) return 'done_all';

      if (status.sent.state === true && status.delivered.state === true && status.seen.state == true) {
        this.classes = { 'text-green': true, 'animate-scale': true }
        return 'done_all';
      }
    }
  }
}
</script>

<style scoped>
.stamp {
  margin-left: 4px;
  font-size: 1.2em;
}
</style>
