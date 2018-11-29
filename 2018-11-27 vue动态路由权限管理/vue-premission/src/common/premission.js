import router from '@/router/index'
import store from '@/store/index'
import { userRoutes } from '@/common/userRoutes'

// 拦截路由
router.beforeEach((to, from, next) => {
  const userInfo = store.state.premission.userInfo
  // 判断是否有token
  if (userInfo.token) {
    // 验证token
    if (checkToken(userInfo.token)) {
      next()
    } else {
      // 跳转登录
      to.path === '/login' ? next() : next('/login')
    }
  } else {
    // 判断localStorage是否有用户信息
    let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''
    if (userInfo) {
      const {token, username, menu} = userInfo
      // 验证tokezn
      if (checkToken(token)) {
        // 设置vuex
        store.dispatch('setUserInfo', {token, username, menu})
        // 设置路由
        userRoutes(menu).then(res => {
          next(to.path)
        }).catch(err => {
          console.log(err)
          to.path === '/login' ? next() : next('/login')
        })
      } else {
        // 跳转登录
        to.path === '/login' ? next() : next('/login')
      }
    } else {
      // 跳转登录
      to.path === '/login' ? next() : next('/login')
    }
  }
})

// 验证token
let checkToken = (token) => {
  return true
}
