<template lang="pug">
  vue-draggable-resizable(dragHandle=".drag",:x="0",:y="200",:w="600",:h="91")
    modal-item(:footer="false")
      template(slot="header")
        h4.drag
          div チャット
      div(slot="body")
        #tab.dragprev
          p(v-for="(item,index) in chatChannels",:class={active:index==chanel}).tab {{item}}
        #log.dragprev
          div(v-for="(item,index) in chatChannels",:class={active:index==channel}).log
            p(v-for="item in log[index]",style="`color: #${item.color}`")
              | {{item.senderName}}
              | :
              | {{item.message}}
        .r
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
        .r
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
    }
  },
  props: [
    'webSocket', 'log', 'chatChannels'
  ],
  components: {
    ModalItem,
    VueDraggableResizable
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
    }
  }
}
</script>

<style lang="scss">
#log p {
  margin: 0;
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
</style>