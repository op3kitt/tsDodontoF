<template lang="pug">
  #container
    nuxt
    modal
</template>

<script>
  import Modal from '~/components/Modal.vue';

  export default {
    components: {
      Modal
    }
  }
</script>


<style lang="scss">
@import url(//fonts.googleapis.com/earlyaccess/notosansjapanese.css);

body {
  font-family: 'Noto Sans Japanese', sans-serif;
  padding: 0;
  margin: 0;
  background: #eee;
  font-size: 12px;
  line-height: 1.8;
}

.modal {
  position: relative !important;
  overflow: visible !important;
}

h4 {
  margin: 0;
}

div.modal-content {
  background: rgba(238,238,238,0.8);

  & > div {
    padding: 0 15px !important;

    dt {
      width: 20%;
      display: inline-block;
      margin: 5px 0;
    }

    dd {
      width: 70%;
      display: inline-block;
      margin: 5px 0;
    }
  }
}

.modal-header {
  padding: 0 !important;
  background: linear-gradient(to bottom, rgba(238,238,238,0.8), rgba(153,235,194,0.8));
}

.close {
  float: right;
}

.backdrop {
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background: rgba(0,0,0,0.2);
  z-index: 9999;
}

.alert {
  animation-name: alert;
  animation-iteration-count: 1;
  animation-duration: 6s;
}

@keyframes alert {
  0% {
    color: red;
  }

  50% {
    color: red;
  }

  100% {
    color: black;
  }
}

.handle,.vdr{position:absolute;box-sizing:border-box}
.handle-tl{width:8px;height:8px;top:-4px;left:-4px;cursor:nw-resize}
.handle-tm{height:8px;top:-4px;left:4px;right:4px;cursor:n-resize}
.handle-tr{width:8px;height:8px;top:-4px;right:-4px;cursor:ne-resize}
.handle-ml{left:-4px;cursor:w-resize}
.handle-ml,.handle-mr{width:8px;top:4px;bottom:4px;}
.handle-mr{right:-4px;cursor:e-resize}
.handle-bl{width:8px;height:8px;bottom:-4px;left:-4px;cursor:sw-resize}
.handle-bm{height:8px;bottom:-4px;left:4px;right:4px;cursor:s-resize}
.handle-br{width:8px;height:8px;bottom:-4px;right:-4px;cursor:se-resize}
</style>