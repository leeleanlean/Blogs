<template>
  <div>
    <hr>
    <dl>
      <dt>这是Index页面</dt>
    </dl>
    <hr>
    <dl>
      <dt>用户名：{{user.token}}</dt>
    </dl>
    <hr>
    <dl class="menu">
      <dt>{{user.token}} 用户的路由信息</dt>
      <dd
        :key="index"
        v-for="(menu, index) in user.userRoutes"
        v-if="index > 2">
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
      <dd @click="loginOut">退出 {{user.token}} 登录</dd>
    </dl>
    <hr>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {},
      menu: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {

    // 初始化
    init () {
      let vuePremission = JSON.parse(localStorage.getItem('vue_premission'))
      if (vuePremission) {
        this.user = vuePremission
      }
    },

    // 跳转
    jumpLink (url) {
      this.$router.push(url)
    },

    // 退出登录
    loginOut () {
      localStorage.removeItem('vue_premission')
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
