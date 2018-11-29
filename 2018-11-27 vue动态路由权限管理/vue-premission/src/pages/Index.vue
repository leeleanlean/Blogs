<template>
  <div>
    <hr>
    <dl>
      <dt>这是Index页面</dt>
    </dl>
    <hr>
    <dl>
      <dt>用户名：{{user.username}}</dt>
    </dl>
    <hr>
    <dl class="menu">
      <dt>{{user.username}} 用户的路由信息</dt>
      <dd
        :key="index"
        v-for="(menu, index) in user.menu">
        <p @click="jumpLink(menu.path)">{{menu.name}}</p>
        <p
          :key="childIndex"
          v-for="(child, childIndex) in menu.children"
          @click="jumpLink(child.path)">
          {{child.name}}
        </p>
      </dd>
    </dl>
    <hr>
    <dl>
      <dd @click="loginOut">退出 {{user.username}} 登录</dd>
    </dl>
    <hr>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      user: {}
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
    // 初始化
    init () {
      if (this.userInfo) {
        this.user = this.userInfo
      }
    },

    // 跳转
    jumpLink (url) {
      this.$router.push(url)
    },

    // 退出登录
    loginOut () {
      localStorage.removeItem('userInfo')
      this.$store.dispatch('clearUserInfo')
      window.location.href = '/'
    }
  }
}
</script>

<style scoped>
.menu dd{
  width: 300px;
  line-height: 32px;
  background-color: #ddd;
}
.menu dd p{
  padding: 0 20px;
}
.menu dd p:hover{
  text-decoration: underline;
  background-color: #999;
  color: #fff;
}
</style>
