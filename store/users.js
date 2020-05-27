import UserService from '@/services/UserService.js'
export const state = () => ({
  user: {}
})
export const mutations = {
  SET_USER(state, user) {
    state.user = user
  }
}
export const actions = {
  fetchUser({ commit }, id) {
    return UserService.getUser(id).then((response) => {
      commit('SET_USER', response.data)
    })
  }
}
