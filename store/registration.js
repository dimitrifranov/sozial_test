import axios from 'axios'
import GroupService from '@/services/GroupService.js'
import UserService from '@/services/UserService.js'

export const state = () => ({
  user: null,
  auth: null
})
export const mutations = {
  SET_USER_DATA(state, userData) {
    state.user = userData
    localStorage.setItem('user', JSON.stringify(userData))
  },
  SET_AUTH_DATA(state, authData) {
    state.auth = authData
    localStorage.setItem('auth', JSON.stringify(authData))
    axios.defaults.headers.common.Authorization = `Bearer ${authData.access_token}`
  }
}

export const actions = {
  registerUser({ commit }, credentials) {
    return GroupService.registerUser(credentials)
      .then(({ data }) => {
        commit('SET_USER_DATA', data)
      })
      .then(() => {
        return UserService.loginUser(credentials.username, credentials.password)
      })
      .then(({ data }) => {
        commit('SET_AUTH_DATA', data)
      })
      .then(() => {
        this.$router.push({ name: 'index' })
      })

      .catch((err) => {
        console.log(err)
      })
  },
  loginUser({ commit }, credentials) {
    return (
      UserService.loginUser(credentials.username, credentials.password)

        .then(({ data }) => {
          commit('SET_AUTH_DATA', data)
        })
        .then(() => {
          commit('SET_USER_DATA', credentials)
        })
        // .then(() => {
        //   axios.get('http://localhost:8000/o/token/')
        // })
        .then(() => {
          this.$router.push({ name: 'index' })
        })

        .catch((err) => {
          console.log(err)
        })
    )
  }
}

export const getters = {
  loggedIn(state) {
    return !!state.user
  }
}
