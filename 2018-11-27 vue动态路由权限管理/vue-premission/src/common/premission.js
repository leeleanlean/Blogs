import router from '@/router/index'
import store from '@/store/index'

// 拦截路由
router.beforeEach((to, from, next) => {
  const userInfo = store.state.premission.userInfo
  console.log('userInfo:', userInfo)
  debugger
  // 判断是否有token
  if (userInfo.token) {
    // 有token，验证token
    const checkToken = true
    if (checkToken) {
      // token 验证通过
      //
      // 设置路由
      console.log(userInfo)
      next()
    } else {
      // token 验证不通过
      next('/login')
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
