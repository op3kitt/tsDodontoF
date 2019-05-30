<template lang="pug">
  .room(:class="{private: room.password}")
    font-awesome-icon(v-show="room.password",icon="lock").icon
    | {{room.roomNo}}：
    | {{room.title}}
    br
    | システム：
    | {{room.system}}
    br
    | 最終更新：
    | {{room.updatedDay}}
    br
    nuxt-link(:to="`/room?room=${room.roomNo}`")
      font-awesome-icon(icon="sign-in-alt").icon
    font-awesome-icon(icon="times",@click="roomDelete(room.roomNo)").icon
    
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLock, faTimes, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add([faLock, faTimes, faSignInAlt]);
export default {
  data() {
    return {
      password: ""
    }
  },
  props: [
    'webSocket', 'room'
  ],
  components: {
    FontAwesomeIcon
  },
  methods: {
    roomDelete(roomNo){
      this.webSocket.send(JSON.stringify({
        cmd: "roomDelete",
        params: {
          roomNo: roomNo,
          password: this.password
        }
      }));
      this.webSocket.send(JSON.stringify({cmd: "getRoomStates"}));
    }
  }
}
</script>

<style lang="scss">
  .room {
    width: 200px;
    height: 200px;
    border-radius: 8px;
    margin: 10px;
    padding: 5px;
    background: #6699ff;
    font-size: 18px;

    &:hover {
      filter: brightness(1.5);
    }

    &.private {
      background: #66ff99;
    }
    
    .icon {
      font-size:30px;
      margin: 5px;
    }
  }

</style>