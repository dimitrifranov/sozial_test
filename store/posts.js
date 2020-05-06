import PostService from '@/services/PostService.js'
export const state = () => ({
  posts: []
})
export const mutations = {
  SET_POSTS(state, response) {
    state.posts.push(...response.results)
  }
}
export const actions = {
  fetchPosts({ commit }, group) {
    return PostService.getPosts(group).then((response) => {
      commit('SET_POSTS', response.data)
    })
  }
}
