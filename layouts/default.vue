<template lang="pug">
  #container
    nuxt
    modal
</template>

<script>
  import Modal from '~/components/Modal.vue';

  export default {
    components: {
      Modal
    }
  }
</script>

<style>

.modal {
  position: relative !important;
  overflow: visible !important;
}

.modal-dialog {
  margin: auto !important;
}

.modal-header {
  padding: 0 !important;
}

.close {
  float: right;
}
</style>