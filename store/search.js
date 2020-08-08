import SearchService from '@/services/SearchService.js'
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
  searchPosts({ commit, state }, data) {
    if (state.results.length === 0 || state.next) {
      return SearchService.getPosts(data, state.next).then((response) => {
        commit('SET_NEXT', response.data.next)
        commit('SET_RESULTS', response.data)
      })
    }
  },
  deletePosts({ commit }) {
    commit('DEL_RESULTS')
  }
}
