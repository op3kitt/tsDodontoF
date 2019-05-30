<template lang="pug">
  section
    button(@click="getRoomStates();") ルーム取得
    RoomList(:rooms="rooms",:webSocket="webSocket")
    button(@click="openLogin();")
      div(v-if="userStatus") {{user.displayName }}
      div(v-else) 未ログイン
    button(@click="$store.commit('increment')") {{ $store.state.counter }}
    button(@click="openCreateRoom();") 新規ルーム作成
</template>

<script>
import Login from '~/components/Login.vue';
import Version from '~/components/Version.vue';
import createRoom from '~/components/createRoom.vue';
import RoomList from '~/components/RoomList.vue';

export default {
  layout: 'default',
  data () {
    return {
      webSocket: {},
      rooms: []
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userStatus() {
    // ログインするとtrue
      return this.$store.getters.isSignedIn;
    }
  },
  components: {
    RoomList
  },
  mounted () {
    this.webSocket = new WebSocket(`ws://${location.host}/`);

    this.webSocket.onopen = () => {
      this.getRoomStates();
      console.log("接続完了");
    };

    this.webSocket.onmessage = (data) => {
      console.log(data);
      try{
        const json = JSON.parse(data.data);
        switch(json.event){
          case "getRoomStates":
            this.rooms = json.data;
          break;
        }
      }catch(e){}
    };

    this.webSocket.onclose = () => {
      console.log("接続終了");
    };
  },
  methods: {
    openLogin(){
      this.$modal.open({
        component: Login,
        options: {
          destroy: true,
          backdrop: false
        },
        props: {
        }
      });
    },
    openCreateRoom(){
      this.$modal.open({
        component: createRoom,
        options: {
          destroy: true,
          backdrop: false
        },
        props: {
          webSocket: this.webSocket
        }
      }).then(modal => {modal.webSocket = this.webSocket;});
    },
    getRoomStates() {
      this.webSocket.send(JSON.stringify({cmd: "getRoomStates"}));
    }
  }
}
</script>