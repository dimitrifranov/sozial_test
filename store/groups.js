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
  fetchGroups({ commit }, user) {
    if (user) {
      return this.$axios.get('/groups/', { params: { user } })
    } else
      return this.$axios.get('/groups/').then((response) => {
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
