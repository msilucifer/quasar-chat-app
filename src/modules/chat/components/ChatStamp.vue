<template>
  <div
    class="q-message-stamp animate-scale"
  >
    {{ props.status.stamp }}
    <i
      aria-hidden="false"
      class="q-icon material-icons stamp"
      :class="classes"
    >
    {{ messageStatus }}
    </i>
  </div>
</template>

<script>
export default {
  name: 'chatStamp',
  props: ['props'],
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
      if (status.sent === false) return 'access_time';

      if (status.sent === true && status.delivered === false) return 'done';

      if (status.sent === true && status.delivered === true) return 'done_all';

      if (status.sent === true && status.delivered === true && status.seen == true) {
        this.classes = { 'text-green': true, 'animate-scale': true };
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
