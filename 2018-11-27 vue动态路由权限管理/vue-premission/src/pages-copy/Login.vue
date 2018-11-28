<template>
  <div>
    <div class="form">
      <div class="form-list">
        使用 <b>admin</b> 或者 <b>guest</b> 登录
      </div>
      <div class="form-list">
        <label>用户名：</label>
        <select v-model="form.username">
          <option value="admin">admin</option>
          <option value="guest">guest</option>
        </select>
      </div>
      <div class="form-list">
        <label>密码：</label>
        <input v-model="form.password" type="password">
      </div>
      <div class="form-list">
        <button @click="login">登录</button>
      </div>
    </div>
    <button @click="aaa">changeName</button>
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
    console.log(this.$store.state.premission.lee)
  },
  methods: {
    aaa () {
      this.$store.dispatch('changeName', 'leeleanlean')
      console.log(this.$store.state.premission.lee)
    },
    init () {
      // 如果有token，直接检验token
      if (localStorage.vue_premission) {
        this.checkToken(localStorage.vue_premission)
      }
    },
    login () {
      login(this.form).then(res => {
        // 登录成功后，获取并设置用户路由
        let { username, menu } = res
        this.setRoutes(username, menu)
      }).catch(err => {
        console.log(err)
      })
    },

    // 设置路由
    setRoutes (username, menu) {
      let resRoutes = []
      menu.forEach(item => {
        let itemComponent = resolve => require([`.${item.filePath}`], resolve)
        resRoutes.push({
          path: item.path,
          name: item.name,
          component: itemComponent,
          children: item.children && item.children.map(i => {
            let iComponent = resolve => require([`.${i.filePath}`], resolve)
            return {
              path: i.path,
              name: i.name,
              component: iComponent,
              children: i.children && i.children.map(ii => {
                let iiComponent = resolve => require([`.${ii.filePath}`], resolve)
                return {
                  path: ii.path,
                  name: ii.name,
                  component: iiComponent
                }
              })
            }
          })
        })
      })
      let userRoutes = router.options.routes.concat(resRoutes)
      router.addRoutes(userRoutes)

      // 设置token
      let VuePremission = {
        token: username,
        userRoutes
      }
      this.checkToken(JSON.stringify(VuePremission))
      console.log('username:', username, 'menu:', menu, 'userRoutes:', userRoutes)
    },

    // 验证token
    checkToken (VuePremission) {
      // 判断localStorage是否有用户信息
      if (!localStorage.vue_premission) {
        localStorage.vue_premission = VuePremission
        this.$router.push('/Index')
        console.log(`-----localStorage.vue_premission Done!!!`)
      } else {
        // 用localStorage用户信息校验token
        let token = JSON.parse(localStorage.vue_premission).token
        if (token) {
          this.$router.push('/Index')
        } else {
          localStorage.removeItem('vue_premission')
          window.location.href = '/'
        }
      }
    }
  }
}
</script>

<style scoped>
.form-list{
  height: 40px;
  display: flex;
  align-items: center;
}
.form-list label {
  width: 60px;
}
select{
  width: 100px;
  height: 32px;
}
input{
  height: 32px;
  border: 1px solid #ddd;
  padding: 0 7px;
}
</style>
