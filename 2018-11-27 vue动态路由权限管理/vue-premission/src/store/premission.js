export default {
  state: {
    userInfo: {
      username: '',
      token: '',
      menu: []
    }
  },
  mutations: {
    // 触发方法 $store.commit('', data)
    SER_USER_INFO (state, data) {
      state.userInfo = data
      console.log('vuex-menu:', state.userInfo)
    }
  },
  actions: {
    // 触发方法 $store.dispatch('', data)
    setUserInfo ({commit, state}, data) {
      commit('SER_USER_INFO', data)
    }
  }
}
