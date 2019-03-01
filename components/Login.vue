<template lang="pug">
vue-draggable-resizable(dragHandle=".drag")
  modal-item(:footer="false")
    template(slot="header")
      h4.drag
        div title
          button.close(type="button", @click="closeModal") ×
    div(slot="body")
      div(v-if="isAuthenticated") {{user}}ログイン中
      div(v-else) ゲストログイン中
        button(@click="showfire();",v-if="fire") ログイン
        firebaseui(v-else)
    template(slot="footer")
</template>
<script>
import VueDraggableResizable from 'vue-draggable-resizable';
import {ModalItem} from 'vue-async-modal';
import firebaseui from '~/components/FirebaseUi.vue';
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      fire: true
    }
  },
  computed: {
    ...mapGetters(['user']),
    ...mapGetters(['isAuthenticated'])
  },
  mounted() {
  },
  methods : {
    closeModal() {
      this.$modal.close()
    },
    showfire() {
      this.fire = false;
    }
  },
  components: {
    ModalItem,
    VueDraggableResizable,
    firebaseui
  }
}
</script>