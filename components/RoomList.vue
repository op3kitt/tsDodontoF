<template lang="pug">
  #roomlist
    div(v-for="item in rooms")
      room(:room="item",:webSocket="webSocket")
</template>

<script>
import Room from './Room.vue';

export default {
  components: {
    Room
  },
  props: [
    'rooms', 'webSocket'
  ]
}
</script>

<style>
#roomlist {
  display: flex;
}
</style>