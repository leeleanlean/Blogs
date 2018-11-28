export default {
  state: {
    lee: 'lean'
  },
  mutations: {
    // 触发方法 $store.commit('changeName')
    changeName (state, data) {
      state.lee = data
    }
  },
  actions: {
    // 触发方法 $store.dispatch('changeName')
    changeName ({commit, state}, data) {
      commit('changeName', data)
    }
  }
}
