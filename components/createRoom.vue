<template lang="pug">
vue-draggable-resizable(dragHandle=".drag")
  modal-item(:footer="false")
    template(slot="header")
      h4.drag
        div ルーム作成
          button.close(type="button", @click="closeModal") ×
    div(slot="body")
      dt ルーム名:
      dd 
        input(v-model="title")
      dt システム:
      dd 
        input(v-model="system")
      dt ダイスボット:
      dd 
        input(v-model="dicebot")
      dt パスワード:
      dd 
        input(type="password",v-model="password")
      dt
        button(@click="createRoom") 作成
    template(slot="footer")
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable';
import {ModalItem} from 'vue-async-modal'

export default {
  name: "createRoom",
  data: () => {
    return {
      title: "a",
      system: "",
      dicebot: "",
      password: "",
    }
  },
  props: {
    webSocket: {
      default: {}
    }
  },
  components: {
    ModalItem,
    VueDraggableResizable
  },
  mounted () {
    console.log(this);
  },
  methods: {
    closeModal() {
      this.$modal.close()
    },
    createRoom() {
      this.webSocket.send(JSON.stringify({
        cmd:"createRoom",
        params: {
          title: this.title,
          system: this.system,
          dicebot: this.dicebot,
          password: this.password
        }
      }));
    }
  }
}
</script>

<style>
h4 {
  margin: 0;
  padding: 0;
}

</style>