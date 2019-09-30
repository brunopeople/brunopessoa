import axios from '@/plugins/axios'

const state = {
  headers: [
    { text: 'ID', value: 'id' },
    { text: 'E-mail', value: 'email' },
    { text: 'Nome', value: 'first_name' },
    { text: 'Sobrenome', value: 'last_name' },
    { text: 'Ações', value: 'action', sortable: false },
  ],
  users: [],
}

const actions = {
  getUsers(state) {
    axios.get('users').then(({ data }) => state.commit('setUsers', data.data))
  },
  createUser(state, user) {
    axios.post('users', user).then(({ data }) => state.commit('addUser', data))
  },
  editUser(state, { user, index }) {
    axios
      .put(`users/${user.id}`, user)
      .then(({ data }) => state.commit('modifyUser', { user: data, index }))
  },
  deleteUser(state, index) {
    state.commit('removeUser', index)
  },
}

const mutations = {
  setUsers(state, users) {
    state.users = users
  },
  addUser(state, user) {
    state.users.push(user)
  },
  modifyUser(state, { user, index }) {
    Object.assign(state.users[index], user)
  },
  removeUser(state, index) {
    state.users.splice(index, 1)
  },
}

const getters = {
  users(state) {
    return state.users
  },
}

export default { state, actions, mutations, getters }
