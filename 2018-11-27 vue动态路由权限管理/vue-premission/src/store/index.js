import Vue from 'vue'
import vuex from 'vuex'

import premission from './premission.js'

Vue.use(vuex)

export default new vuex.Store({
  modules: {
    premission: premission
  }
})
