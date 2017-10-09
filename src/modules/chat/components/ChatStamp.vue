<template>
  <div>
    <!-- <div class="q-message-stamp"></div> -->
    <div
      style="width:100%;"
      class="q-message-stamp animate-scale"
    >
      {{ options.stamp }}
      <i
        aria-hidden="false"
        class="q-icon material-icons text-white"
      >
      done_all
      </i>
    </div>
    {{ options }}
  </div>
</template>

<script>
export default {
  name: 'chatStamp',
  props: ['options'],
  methods: {
    wasItSent() {

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
