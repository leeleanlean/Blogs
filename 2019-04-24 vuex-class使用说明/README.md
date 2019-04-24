## vuex-class使用说明
> 在vue-cli3中.ts文件使用 vuex 时，用此装饰器来简化书写。

### 引入依赖
```
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
```


### 使用方法
> vuex-class装饰器使用方法

```
@State('common') common!:any
@State(state => state.common) userinfo!:any
@Getter('userInfo') vUserInfo!:any
@Action('setUserInfo') setUserInfo:any
@Mutation('SER_USER_INFO') mSetUserInfo:any

created ():void {
  console.log('common', this.common)
  console.log('userinfo', this.userinfo)
  console.log('vUserInfo', this.vUserInfo)
  this.setUserInfo({})
  this.mSetUserInfo({})
}
```
### Store
> 公共状态管理容器搭建过程

main.js
```
import store from './store/index'
```

./store/index
```
import Vue from 'vue'
import vuex from 'vuex'

import common from './common/index'

Vue.use(vuex)

export default new vuex.Store({
  modules: {
    common: common
  }
})
```

./store/common/index
```
export default {
  state: {
    userInfo: {
      username: 'Lean',
      token: 'dhjwkehfsgasadsdasasd',
      age: 20
    }
  },
  getters: {
    userInfo: (state:any) => {
      return state.userInfo
    }
  },
  mutations: {
    // 设置用户信息
    SER_USER_INFO(state:any, data:any) {
      data.clear
        ? state.userInfo = {}
        : state.userInfo = Object.assign({}, state.userInfo, data)
    },

    // 清空用户信息
    CLEAR_USER_INFO(state: any) {
      state.userInfo = ''
    }
  },
  actions: {
    // 设置用户信息
    setUserInfo({ commit, state }: any, data: any) {
      commit('SER_USER_INFO', data)
    },

    // 清空用户信息
    clearUserInfo({ commit, state }: any, data: any) {
      commit('CLEAR_USER_INFO')
    }
  }
}
```