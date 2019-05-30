<template lang="pug">
.backdrop
  vue-draggable-resizable(dragHandle=".drag",:parent="true",:x="center_x",:y="200",:w="600",:h="91")
    modal-item(:footer="false")
      template(slot="header")
        h4.drag
          div ルームログイン
      div(slot="body")
        dt パスワード:
        dd 
          input(type="password",v-model="password")
          span#login_alert {{message}}
        dt
          button(@click="login(password);") 入室
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable';
import {ModalItem} from 'vue-async-modal';

export default {
  data(){
    return {
      password: "",
      center_x: window.innerWidth / 2 - 300 | 0
    }
  },
  props: ['status','webSocket','roomNo','message'],
  mounted() {
    if(this.status == "login"){
      this.webSocket.send(JSON.stringify({
        cmd:"login",
        params: {
          roomNo: this.$route.query.room
        }
      }));
    }
  },
  components: {
    ModalItem,
    VueDraggableResizable
  },
  methods: {
    setMessage(msg){
      let obj = document.getElementById("login_alert");
      var newObj = obj.cloneNode(true);
      newObj.innerText = msg;
      newObj.classList.add("alert");
      newObj.addEventListener("animationend", () => {
        let obj = document.getElementById("login_alert");
        obj.classList.remove("alert");
      }, {once: true});
      obj.parentNode.replaceChild(newObj, obj);
    },
    login(password){
      this.webSocket.send(JSON.stringify({
        cmd:"login",
        params: {
          roomNo: this.$route.query.room,
          password: this.password
        }
      }));
    }
  }
};
</script>