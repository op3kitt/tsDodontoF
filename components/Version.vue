<template lang="pug">
vue-draggable-resizable(dragHandle=".drag")
  modal-item(:footer="false")
    template(slot="header")
      h4.drag
        div title
          button.close(type="button", @click="closeModal") ×
    div(slot="body")
      | VTalk:{{version}}
    template(slot="footer")
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable';
import {ModalItem} from 'vue-async-modal'
import * as pack from '../package.json';

export default {
  name: "version",
  data: () => {
    return {
      version: pack.version
    }
  },
  components: {
    ModalItem,
    VueDraggableResizable
  },
  methods: {
    closeModal() {
      this.$modal.close()
    },
  }
}
</script>

<style>
h4 {
  margin: 0;
  padding: 0;
}

</style>