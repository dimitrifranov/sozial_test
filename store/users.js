import UserService from '@/services/UserService.js'
export const state = () => ({
  user: {},
  notifications: []
})
export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_NOTIFICATIONS(state, notifications) {
    state.notifications = notifications
  }
}
export const actions = {
  fetchUser({ commit }, id) {
    return UserService.getUser(id).then((response) => {
      commit('SET_USER', response.data)
    })
  },
  updateUser({ commit }, data) {
    return UserService.updateUser(data).then((response) => {
      commit('SET_USER', response.data)
    })
  },
  getNotifications({ commit }, user) {
    return UserService.getNotifications({ user }).then((response) => {
      commit('SET_NOTIFICATIONS', response.data.results)
    })
  }
}
