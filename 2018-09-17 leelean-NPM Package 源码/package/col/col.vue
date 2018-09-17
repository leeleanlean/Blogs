<template>
  <div :class="gird">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'LCol',
  data () {
    return {
      gird: String
    }
  },
  props: {
    span: Number
  },
  mounted () {
    if (this.span) this.gird = 'col-' + this.span
  }
}
</script>

<style scoped>
.col-12{ width: 100%; }
.col-11{ width: 96.666663%; }
.col-10{ width: 83.33333%; }
.col-9{ width: 74.999997%; }
.col-8{ width: 66.666664%; }
.col-7{ width: 58.333331%; }
.col-6{ width: 49.999998%; }
.col-5{ width: 41.666665%; }
.col-4{ width: 33.333332%; }
.col-3{ width: 24.999999%; }
.col-2{ width: 16.666666%; }
.col-1{ width: 8.333333%; }
</style>
