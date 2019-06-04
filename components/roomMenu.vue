<template lang="pug">
#roomMenu
  .menuarea
    .dropdown マップ
      .dropdown-content
        button#btn_maptile(@click="modeMapEdit",:class="{checked:mapEdit}") マップタイル変更モード
  //-
    .dropdown ファイル
      .dropdown-content
        button#btn_save セーブ
        button#btn_load ロード
        hr
        button#btn_saveall 全データセーブ
        button#btn_loadall 全データロード（旧：シナリオデータ読み込み）
        hr
        button#btn_savechatlog チャットログ保存
        hr
        button#btn_startrecord(disabled) 録画開始
        button#btn_endrecord(disabled) 録画終了
        button#btn_cancelrecord(disabled) 録画キャンセル
        hr
        button#btn_logout ログアウト
    .dropdown 表示
      .dropdown-content
        .dropdown2 ウィンドウ
        .dropdown-content2
          button#btn_displaychat チャット表示
          button#btn_displaydice ダイス表示
          button#btn_displayinitiative イニシアティブ表示
          button#btn_displayresource(disabled) リソース表示
          hr
          button#btn_displaychatpalette チャットパレット表示
          button#btn_displaycounter(disabled) カウンターリモコン表示
        hr
        button#btn_displaycharacter 立絵表示
        button#btn_displaycutin(disabled) カットイン表示
        hr
        button#btn_displaygridnum 座標表示
        button#btn_displaygridline マス目表示
        hr
        button#btn_gridguide マス目にキャラクターを合わせる
        button#btn_adjustcharacter 立絵のサイズを自動調整する
        hr
        button#btn_changefont(disabled) フォントサイズ変更
        hr
        button#btn_resetwindow(disabled) ウィンドウ配置初期化
        button#btn_resetdisplay 表示状態初期化
    .dropdown コマ
      .dropdown-content
        button#btn_createcharacter キャラクター追加
        .dropdown2 範囲追加
        .dropdown-content2
          button#btn_rangedd3 魔法範囲追加(D&D3版)
          button#btn_rangedd4 魔法範囲追加(D&D4版)
          button#btn_rangelh ログホライズン用範囲
          button#btn_rangemg 攻撃範囲(メタリックガーディアン)
        button#btn_magictimer 魔法タイマー追加
        hr
        button#btn_createchit チット作成
        hr
        button#btn_graveyard 墓場
        button#btn_waitroom(disabled) キャラクター待合室
        hr
        button#btn_rotate(disabled) 回転マーカーを表示する
    .dropdown カード
      .dropdown-content
        button#btn_cardpickup(disabled) カードピックアップウィンドウ表示
        button#btn_cardlog(disabled) カード操作ログ表示
        hr
        button#btn_cardchange(disabled) カード配置の初期化
        hr
        button#btn_cardreset(disabled) カードの全削除
    .dropdown マップ
      .dropdown-content
        button#btn_mapchange マップ変更
        button#btn_maptile フロアタイル変更モード
        button#btn_mapmask マップマスク追加
        button#btn_mapmodify(disabled) 簡易マップ作成
        hr
        button#btn_mapsave マップ状態保存
        button#btn_mapload マップ切り替え
    .dropdown 画像
      .dropdown-content
        button#btn_imageupload ファイルアップローダー
        button#btn_camera(disabled) WEBカメラ撮影
        hr
        button#btn_imagetagedit(disabled) タグ編集
        button#btn_imagedelete 画像削除
    .dropdown ヘルプ
      .dropdown-content
        button#btn_version2 バージョン
        button#btn_manual2 マニュアル
        button#btn_tutorial2(disabled) チュートリアル動画
        button#btn_site2 オフィシャルサイトへ
  img#btn_zoomin(src="img/icons/zoom_in.png")
  img#btn_zoomout(src="img/icons/zoom_out.png")
  button#btn_member ルームNo.X：0名
  button#btn_memo 共有メモ
  button#btn_draw(disabled)
    img(src="img/icons/pencil.gif")
    | 手書き
  button#btn_graveyard2 墓場
  button#btn_logout2.pull-right
    img(src="img/icons/door_out.png")
    | ログアウト
  button#btn_screenshot(disabled).pull-right
    img(src="img/icons/camera.png")
  #comd
    div(v-show="mapEdit")
      button(@click="openCreateFloorTileWindow")
        font-awesome-icon(icon="plus")
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import createFloorTileWindow from '~/components/window/createFloorTileWindow.vue';

library.add(faPlus);

export default {
  data() {
    return {
      mapEdit: false,
    }
  },
  props: ['webSocket'],
  components: {
    FontAwesomeIcon
  },
  methods: {
    modeMapEdit() {
      this.mapEdit = !this.mapEdit;
    },
    openCreateFloorTileWindow() {
      this.$modal.resolve({
        id: 'createFloorTileWindow',
        component: createFloorTileWindow,
        options: {
          destroy: true
        },
        props: {
          webSocket: this.webSocket
        }
      })
    }
  }
}
</script>

<style lang="scss">
#roomMenu{
  #comd > div {
    position: fixed;
    top: 44px;
    left: 8px;

    button {
      border: 0;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #6699ff;
      box-shadow: #000000 4px 4px 4px;
      font-size: 24px;
      padding: 8px;

      &:hover {
        filter: brightness(1.2);
      }

      &:active {
        transform: translate3d(4px,4px,0);
        box-shadow: #000000 0px 0px 4px;
      }
    }
  }

  z-index: 1000;
  position: fixed;
  top: 0;
  width: 100%;
  height: 36px;
  background: linear-gradient(to bottom, #efefef, transparent);
  box-shadow: #333 0 2px 4px;

  .menuarea{
    display: inline-block;
    background: linear-gradient(to bottom, #eeeeee, transparent 120%);
    margin: 4px 20px;
    border: #aaa solid 1px;

    .dropdown{
      width: 5em;
      border: 0;
      background: transparent;
      border-radius: 0;

      .dropdown-content{
        left: 0;
      }
    }


    .dropdown:hover {
      background: linear-gradient(to top, #eeeeee, #fff 120%);
    }
  }

  .dropdown-content {
    inline-size: max-content;
  }

  .dropdown-content button {
    font-size: 9pt;
    
    &.checked {
    padding-left: 0;
    
      &::before {
        content: url(/img/icons/tick.png);
        position: relative;
        top: 2px;
      }
    }
  }

  #btn_zoomin {
    margin-left: 20px;
    margin-top: 3px;
  }
  #btn_zoomout {
    margin-right: 20px;
    margin-top: 3px;
  }

  #btn_screenshot {
    margin-top: 4px;
    margin-right: 8px;
  }
  #btn_logout2 {
    margin-top: 4px;
    margin-right: 20px;
  }
}


.dropdown {
  position: relative;
  display: inline-block;
  padding: 3px;
  background: #eeeeee;
  border: solid 1px #cccccc;
  border-radius: 4px;
  width: 6em;
  text-align: center;
  
  &:hover .dropdown-content {
    display: block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    right: 0;
    
    button {
      border: 0;
      background: transparent;
      display: block;
      width: 100%;
      text-indent: 1em;
      text-align: left;
      
      &:hover {
        background: #cff;
      }
    }
  }
}
</style>