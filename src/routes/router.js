import Vue from 'vue'
import Router from 'vue-router'

import TheHome from '@/views/TheHome'
import UsersView from '@/views/UsersView'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: TheHome,
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView,
    },
  ],
})

export default router
