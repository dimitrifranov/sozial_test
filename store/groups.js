import GroupService from '@/services/GroupService.js'
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
    return GroupService.getGroups().then((response) => {
      commit('SET_GROUPS', response.data)
    })
  }
}
