<template lang="pug">
#createFloorTileWindow
  abstract-window(title="フロアタイル追加")
    template(slot="body")
      input(type="file")
      input(v-model="scaleX",type="number",step="0.01",min="0.01",required)
      input(v-model="scaleY",type="number",step="0.01",min="0.01",required)
</template>

<script>
import AbstractWindow from '~/components/window/window.vue';

export default {
  data() {
    return {
      scaleX: 1.00,
      scaleY: 1.00
    }
  },
  props: [
    'webSocket', 'id'
  ],
  components: {
    AbstractWindow
  }
}
</script>

<style lang="scss">
</style>