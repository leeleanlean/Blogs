<template>
  <div>
    <div class="form">
      <div class="form-list">
        <label>用户名</label>
        <input v-model="form.username" type="text">
      </div>
      <div class="form-list">
        <label>密码</label>
        <input v-model="form.password" type="password">
      </div>
      <div class="form-list">
        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>

import { login } from '@/data/api/login'
import router from '@/router'

export default {
  data () {
    return {
      form: {
        username: 'admin',
        password: '111111'
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      console.log('init')
    },
    login () {
      login(this.form).then(res => {
        // 登录成功后，获取到用户路由信息
        let { username, menu } = res
        console.log(username, menu)

        let resRoutes = []
        menu.forEach(item => {
          resRoutes.push({
            path: item.path,
            component: resolve => require([`.${item.path}`], resolve)
          })
        })
        console.log('resRoutes', resRoutes)

        let newRoutes = router.options.routes.concat(resRoutes)

        console.log('newRoutes', newRoutes)

        router.addRoutes(newRoutes)

        console.log('router', router)

        this.$router.push('/Index')
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
