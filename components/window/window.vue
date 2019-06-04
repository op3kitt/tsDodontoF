<template lang="pug">
vue-draggable-resizable(:style="{zIndex: zIndex}",dragHandle=".drag",:w="width",:h="height",:x="left",:t="top",@resize="onResize",@drag="onDrag")
  modal-item(:footer="false")
    slot(name="header")
      div(slot="header")
        h4.drag
          | {{title}}
    slot(name="body")
      div(slot="body")
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable';
import {ModalItem} from 'vue-async-modal';

export default {
  data() {
    return {
      width: 400,
      height: 200,
      left: 0,
      top: 200,
      zIndex: 0,
    }
  },
  components: {VueDraggableResizable, ModalItem},
  props: ['w','h','x','y','title'],
  mounted() {
    //wndIDを決める
    this.wndID = this.$store.state.wndCount;
    //ウインドウステータスを登録する
    this.$store.dispatch('setWndStatuses', {wndID: this.$store.state.wndCount});
    this.$store.dispatch('moveWndToTop', {wndID: this.wndID});
    this.w && (this.width = this.w);
    this.h && (this.height = this.h);
    if(this.x){
      this.left = this.x;
    }else{
      this.left = (window.innerWidth / 2) - (this.width / 2);
    }
    if(this.y){
      this.top = this.y;
    }else{
      this.top = (window.innerHeight / 2) - (this.height / 2);
    }
  },
  methods: {
    onDrag(x, y){
      this.left = x;
      this.top = y;
      this.$store.dispatch('moveWndToTop', {wndID: this.wndID});
    },
    onResize: function (x, y, width, height) {
      this.left = x;
      this.top = y;
      this.width = width;
      this.height = height;
      this.$store.dispatch('moveWndToTop', {wndID: this.wndID});
    },
  }
}
</script>
