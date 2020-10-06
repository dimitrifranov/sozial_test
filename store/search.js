export const state = () => ({
  results: [],
  next: null
})
export const mutations = {
  SET_RESULTS(state, response) {
    state.results.push(...response.results)
  },
  SET_NEXT(state, next) {
    state.next = next
  },
  DEL_RESULTS(state) {
    state.results = []
  }
}
export const actions = {
  searchUsers({ commit, state }, data) {
    if (state.results.length === 0 || state.next) {
      if (state.next)
        return this.$axios.get(state.next).then((response) => {
          commit('SET_NEXT', response.data.next)
          commit('SET_RESULTS', response.data)
        })
      else
        return this.$axios
          .get('/users/?search=' + data.text)
          .then((response) => {
            commit('SET_NEXT', response.data.next)
            commit('SET_RESULTS', response.data)
          })
    }
  },
  deleteResults({ commit }) {
    commit('DEL_RESULTS')
  },
  searchGroups({ commit, state }, data) {
    if (state.results.length === 0 || state.next) {
      if (state.next)
        return this.$axios.get(state.next).then((response) => {
          commit('SET_NEXT', response.data.next)
          commit('SET_RESULTS', response.data)
        })
      else if (data.user)
        return this.$axios
          .get('/groups/?search=' + data.text, {
            params: { user: data.user }
          })
          .then((response) => {
            commit('SET_NEXT', response.data.next)
            commit('SET_RESULTS', response.data)
          })
      else
        return this.$axios
          .get('/groups/?search=' + data.text)
          .then((response) => {
            commit('SET_NEXT', response.data.next)
            commit('SET_RESULTS', response.data)
          })
    }
  }
}
