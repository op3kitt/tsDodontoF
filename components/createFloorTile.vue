<template lang="pug">
modal(ref="modal")
</template>

<script>
import Modal from '~/components/Modal.vue';
import createFloorTileWindow from '~/components/window/createFloorTileWindow.vue';

export default {
  data() {
    return {}
  },
  components: {
    Modal
  },
  props: [
    'webSocket'
  ],
  methods: {
    showDialog() {
      this.$refs.modal.open({
        id: 'createFloorTileWindow',
        component: createFloorTileWindow,
        options: {
          show: true,
          destroy: true
        },
        props: {
          webSocket: this.webSocket
        }
      })
    }
  }
}
</script>

<style lang="scss">
</style>