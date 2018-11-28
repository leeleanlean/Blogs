<template>
  <div>
    guest
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    console.log('guest')
  }
}
</script>

<style scoped>

</style>
