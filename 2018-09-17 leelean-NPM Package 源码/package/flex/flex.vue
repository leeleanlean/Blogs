<template>
  <div class="flex" :style="flexStyle">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'LFlex',
  data () {
    return {
      flexStyle: {}
    }
  },
  props: {
    option: Object
  },
  created () {
    let _ = this.option
    for (let i in _) {
      if (i.includes('-')) {
        this.flexStyle[i] = _[i]
      } else {
        this.flexStyle['flex-' + i] = _[i]
      }
    }
  }
}
</script>
<style scoped>
.flex{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
</style>
