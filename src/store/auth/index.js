import axios from '@/plugins/axios'
import router from '@/routes/router'

const state = {
  token: null,
}

const actions = {
  userLogin(state, user) {
    axios
      .post('login', user)
      .then(({ data }) => state.commit('setAuth', data.token))
      .then(() => router.push({ name: 'users' }))
  },
  userLogout(state) {
    router.push({ name: 'home' })
    state.commit('purgeAuth')
  },
}

const mutations = {
  setAuth(state, token) {
    state.token = token
  },
  purgeAuth(state) {
    state.token = null
  },
}

export default { state, actions, mutations }
