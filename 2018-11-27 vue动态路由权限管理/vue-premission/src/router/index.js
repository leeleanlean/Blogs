import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/Login'
import Index from '@/pages/Index'
import NotFound from '@/pages/404'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name: 'Login', component: Login },
    { path: '/index', name: 'Index', component: Index },
    { path: '*', name: '404', component: NotFound }
  ]
})
