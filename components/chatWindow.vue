<template lang="pug">
#chat
  vue-draggable-resizable(dragHandle=".drag",:x="0",:y="200",:w="width",:h="height+24",@resizing="onResize")
    modal-item(:footer="false",:width="width")
      template(slot="header")
        h4.drag
          div チャット
      div(slot="body",:style="`height:${height}px`")
        .body
          #tab.dragprev
            template(v-for="(item,index) in chatChannels")
              p(@click="setChannel(index);",:class="{active:index==channel}").tab {{item}}
          #log.dragprev
            template(v-for="(item,index) in chatChannels")
              div(:class="{active:index==channel}",v-chat-schroll="{smooth:true}").log
                p(v-for="item in log[index]",:style="`color: #${item.color}`")
                  | {{item.senderName}}
                  | :
                  | {{item.message|nl2br}}
        .body2
          | 名前
          input#chatname(v-model="senderName")
          button.img#btn_private.disabled
            img(src="/img/icons/key.png")
            .helptext 秘話機能有効化
          select#dicebot
          button.img#btn_help
            img(src="/img/icons/icon_help.png")
            .helptext ダイスボットのヘルプを別ウィンドウで表示します。
          button.img#btn_diceBotTable
            img(src="/img/icons/page_white_gear.png")
            .helptext ダイスボット表追加・変更・削除
          button.img#btn_novel.disabled
            img(src="/img/icons/book_open.png")
            .helptext ログ表示をノベルゲーム風表示へ切り替える
          button.img#btn_chatDelete
            img(src="/img/icons/page_white_delete.png")
            .helptext チャットログ全削除
          button.img#btn_chatFont
            img(src="/img/icons/font.png")
            .helptext チャット文字設定
          button.img#btn_mute
            img(src="/img/icons/sound.png")
            .helptext 音再生あり
          button.img#btn_vote
            img(src="/img/icons/user_comment.png")
            .helptext 点呼／投票
          button.img#btn_alerm
            img(src="/img/icons/bell.png")
            .helptext 目覚ましアラーム送信
          button.img#btn_cutinList.disabled
            img(src="/img/icons/film.png")
            .helptext カットイン設定
          button.img#btn_characterList
            img(src="/img/icons/user_edit.png")
            .helptext 立絵設定
          button.img#btn_easyUpload
            img(src="/img/icons/page_white_get.png")
            .helptext 簡易ファイルアップローダー
          button.img#btn_talk.disabled
            img(src="/img/icons/emoticon_smile.png")
            .helptext テキスト読み上げなし
          br
          | 発言
          textarea#chattext(v-model="message",@keypress="checkkey")
          div.btn_area
            button#btn_chatsend.fix(@click="sendChatMessage") 送信
            button#btn_savelog2.fix ログ保存
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable';
import {ModalItem} from 'vue-async-modal';

export default {
  data(){
    return {
      channel: 0,
      senderName: "",
      message: "",
      color: "#000000",
      width: 900,
      height: 300
    }
  },
  props: [
    'webSocket', 'log', 'chatChannels'
  ],
  plugins: ['~/plugins/vue-chat-scroll'],
  components: {
    ModalItem,
    VueDraggableResizable
  },
  filters: {
    nl2br(str){
      return str.replace(/\n/g, "\n");
    }
  },
  methods: {
    checkkey(e){
      if(e.keyCode == 13 && !e.shiftKey){
        this.sendChatMessage();
        return false;
      }
    },
    sendChatMessage(){
      console.log(this);
      this.webSocket.send(JSON.stringify({
        cmd:"sendChatMessage",
        params: {
          roomNo: this.$route.query.room,
          channel: this.channel,
          senderName: this.senderName,
          message: this.message,
          color: this.color
        }
      }));
      this.message = "";
      return false;
    },
    setChannel(channel){
      this.channel = channel;
    },
    onResize: function (x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
  }
}
</script>

<style lang="scss">
#chat {
  width: 900px;
  height: 300px;
#log{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  top: 2.2em;
  left: 10px;
  right: 10px;
  background: #fff;
  overflow: hidden;

  div {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    bottom: -18px;
    overflow: scroll;

    .time {
      color: black;
    }
  }

  div.active {
    display: block;
  }

  p {
    margin: 0;
  }
}
    

  label, button {
    & .helptext {
      display: none;
    }

    &:hover .helptext{
      z-index: 200;
      display: block;
      position: absolute;
      top: 20px;
      left: 20px;
      background: #ffff99;
      opacity: 0.8;
      border: solid #666633 1px;
      inline-size: max-content;
    }
  }

  .body {
    padding: 0.3em;
    position: absolute;
    top: 22px;
    left: 0;
    right: 0;
    bottom: 105px;

    #tab {
      padding-left: 10px;

      & > p {
        background: linear-gradient(to bottom, #ccc, transparent 120%);
        float: left;
        margin: 0;
        padding: 0.2em 1em;
        margin-right: 4px;
      }

      & > p.active {
        background: #fff;
      }
    }

    #log{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
      top: 2.2em;
      left: 10px;
      right: 10px;
      background: #fff;
      overflow: hidden;

      div {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        bottom: -18px;
        overflow: scroll;

        .time {
          color: black;
        }

        pre {
          margin: 0;
        }
      }

      div.active {
        display: block;
      }
    }
  }
      .body2 {
    position: absolute;
    padding: 0.3em;
    bottom: 0;

    textarea {
      vertical-align: top;
      width: 700px;
      height: 70px;
    }

    button.fix {
      float: right;
      width: 100px;
    }

    .btn_area{
      width: 120px;
      float: right;
    }
  }

}
</style>