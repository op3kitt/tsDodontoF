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
</style>