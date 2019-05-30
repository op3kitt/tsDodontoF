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
      dt ダイスボット:
      dd 
        select(v-model="dicebot",@change="setTitle();")
          option(v-for="(item, key) in systems",v-bind:value="key")
            | {{item}}
      dt システム:
      dd 
        input(v-model="system")
      dt パスワード:
      dd 
        input(type="password",v-model="password")
      dt
        button(@click="createRoom") 作成
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable';
import {ModalItem} from 'vue-async-modal';
import * as https from 'https';
import axios from 'axios';

export default {
  name: "createRoom",
  data: () => {
    return {
      title: "a",
      system: "",
      dicebot: "",
      password: "",
      systems: {BaseDiceBot:"（指定なし）"}
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
  async mounted () {
    const res = await axios.get(`${process.env.bcdiceUrl}v1/names`);
    const data = res.data;
    let list = data.names.filter((v) => {return v.system.indexOf(':') == -1;});
    let systems = Object.assign({BaseDiceBot:"（指定なし）"}, list.reduce((obj, item) => Object.assign(obj, {[item.system]: item.name}), {}));
    this.setSystems(systems);
  },
  methods: {
    setTitle(){
      this.system = this.systems[this.dicebot];
    },
    setSystems(systems) {
      this.systems = systems;
    },
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
      this.$modal.close();
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