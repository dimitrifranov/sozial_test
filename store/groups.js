import GroupService from '@/services/GroupService.js'
export const state = () => ({
  groups: [],
  joining: {}
})
export const mutations = {
  SET_GROUPS(state, groups) {
    state.groups = groups
  },
  SET_JOINING(state, joining) {
    state.joining = joining
  },
  DEL_JOINING(state) {
    state.joining = {}
  }
}
export const actions = {
  fetchGroups({ commit }) {
    return GroupService.getGroups().then((response) => {
      commit('SET_GROUPS', response.data)
    })
  },
  setJoining({ commit }, joining) {
    commit('SET_JOINING', joining)
  },
  delJoining({ commit }) {
    commit('DEL_JOINING')
  }
}
