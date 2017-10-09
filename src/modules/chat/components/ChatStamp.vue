<template>
  <div
    class="q-message-stamp animate-scale"
  >
    {{ options.stamp }}
    <i
      aria-hidden="false"
      class="q-icon material-icons text-white stamp"
    >
    {{ icon }}
    </i>
    {{ wasItSent }}
  </div>
</template>

<script>
export default {
  name: 'chatStamp',
  props: ['options'],
  data() {
    return {
      icon: ''
    };
  },
  computed: {
    wasItSent() {
      if (1 > 0) {
        this.icon = 'done';
        
        return;
      }
    },
    wasItSeen() {

    },
    wasItDelivered() {
      
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
