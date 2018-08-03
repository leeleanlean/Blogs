<template>
  <el-container>
    <el-aside></el-aside>
    <el-main>
      <h3>Hello, f2e-work</h3>
      <el-button
        type="text"
        @click="$router.push('/list')">
        任务列表
      </el-button>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
h3{
  width: 600px;
  font-size: 28px;
  margin: 10px 0 30px 0;
}
</style>
