<template lang="pug">
  #root
    room-menu
    chat-window(:webSocket="webSocket",:log="log",:chatChannels="chatChannels")
    #content(@mouseMove="")
      | {{message}}
</template>

<script>
import chatWindow from '~/components/chatWindow.vue';
import roomLogin from '~/components/roomLogin.vue';
import roomMenu from '~/components/roomMenu.vue';

export default {
  data() {
    return {
      status: "login",
      webSocket: {},
      message: "",
      modal: {},
      log: [],
      chatChannels: []
    }
  },
  components: {
    roomMenu,
    chatWindow
  },
  mounted() {
    this.webSocket = new WebSocket(`ws://${location.host}/`);
    this.webSocket.onopen = () => {
      console.log("接続完了");
      
      this.$modal.open({
        component: roomLogin,
        options: {
          destroy: true
        },
        props: {
          webSocket: this.webSocket,
          status: this.status,
          roomNo: this.$route.query.room,
          message: ""
        }
      });
    };

    this.webSocket.onmessage = (data) => {
      console.log(data);
      try{
        const json = JSON.parse(data.data);
        switch(json.event){
          case "loginResult":
            if(json.result){
              this.$modal.close();
            }else{
              if(json.password){
                console.log(this.$modal.currModal);
                this.$modal.currModal.props.status == "Password" && (this.$modal.currModal.component.methods.setMessage("パスワードが違います。"));
                this.$modal.currModal.props.status = "Password";
              }else{
                alert("存在しない部屋番号です。");
                location.href = "/";
              }
            }
          break;
          case "roomInfo": 
            this.chatChannels = json.data.chatChannels;
            this.log = [];
            for(item in this.chatChannels){
              this.log.push([]);
            }
          break;
          case "chatMessage":
            this.log[json.data.channel] = this.log[json.data.channel].concat(json.data);
          console.log(this.log);
          break;
        }
      }catch(e){}
    };

    this.webSocket.onclose = () => {
      console.log("接続終了");
    };

    
  }
}
</script>

<style lang="scss">
#content {
  position: absolute;
  left: 0;
  top: 0;
}

button.img {
  border-radius: 0;
  border: 0;
  background: transparent;
  padding: 0;
  margin-left: 8px;
  margin-right: 8px;

  & + & {
    margin-left: 0;
  }
}
</style>