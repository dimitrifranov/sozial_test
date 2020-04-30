import EventService from '@/services/EventService.js'
export const state = () => ({
  groups: []
})
export const mutations = {
  SET_GROUPS(state, groups) {
    state.groups = groups
  }
}
export const actions = {
  fetchGroups({ commit }) {
    return EventService.getGroups().then((response) => {
      commit('SET_GROUPS', response.data)
    })
  }
}
