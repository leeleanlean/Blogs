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
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { login } from '@/data/api/login'
import { userRoutes } from '@/common/userRoutes'

export default {
  data () {
    return {
      form: {
        username: 'admin',
        password: '111111'
      },
      token: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // 解决路由返回登录页面，vuex未清，再次登录路由缓存问题
      let { token } = this.userInfo
      if (token) {
        this.token = this.userInfo.token
        let checkToken = true
        if (checkToken) {
          this.$router.push('/index')
        } else {
          this.$store.dispatch('clearUserInfo')
          window.location.href = '/#/login'
        }
      } else {
        localStorage.removeItem('userInfo')
      }
    },
    login () {
      login(this.form).then(res => {
        // 登录成功后，获取并设置用户路由
        const {username, menu} = res
        console.log('username:', username, 'menu:', menu)
        localStorage.userInfo = JSON.stringify(res)
        this.$store.dispatch('setUserInfo', res)
        userRoutes(menu)
        this.$router.push('/index')
      }).catch(err => {
        console.log(err)
      })
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
