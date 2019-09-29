import Vue from 'vue'
import Router from 'vue-router'

import TheLogin from '@/components/TheLogin'
import UsersList from '@/components/UsersList'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: TheLogin,
    },
    {
      path: '/users',
      name: 'users',
      component: UsersList,
    },
  ],
})

export default router
