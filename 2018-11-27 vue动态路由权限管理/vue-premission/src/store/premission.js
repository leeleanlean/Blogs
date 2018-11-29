export default {
  state: {
    userInfo: {
      username: '',
      token: '',
      menu: []
    }
  },
  getters: {
    userInfo: state => {
      return state.userInfo
    }
  },
  mutations: {
    // 触发方法 $store.commit('', data)
    SER_USER_INFO (state, data) {
      state.userInfo = data
    },

    // 清空用户信息
    CLEAR_USER_INFO (state) {
      state.userInfo = ''
    }
  },
  actions: {
    // 触发方法 $store.dispatch('', data)
    setUserInfo ({commit, state}, data) {
      commit('SER_USER_INFO', data)
    },

    // 清空用户信息
    clearUserInfo ({commit, state}, data) {
      commit('CLEAR_USER_INFO')
    }
  }
}
