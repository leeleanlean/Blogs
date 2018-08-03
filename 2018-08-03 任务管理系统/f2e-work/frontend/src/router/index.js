import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Add from '@/views/Add'
import List from '@/views/List'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'HelloWorld', component: HelloWorld },
    { path: '/add/:id?', name: 'Add', component: Add },
    { path: '/list', name: 'List', component: List }
  ]
})
