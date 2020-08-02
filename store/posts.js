import PostService from '@/services/PostService.js'
export const state = () => ({
  posts: [],
  next: null
})
export const mutations = {
  SET_POSTS(state, response) {
    state.posts.push(...response.results)
  },
  SET_NEXT(state, next) {
    state.next = next
  },
  ADD_LIKE(state, response) {
    const post = state.posts.find((obj) => obj.id === response.post)
    post.likes.push(response)
  },
  // todo should not work yet!!
  ADD_COMMENT(state, response) {
    const post = state.posts.find((obj) => obj.id === response.post)
    post.comments.push(response)
  }
}
export const actions = {
  fetchPosts({ commit, state }, group) {
    return PostService.getPosts(group, state.next).then((response) => {
      commit('SET_NEXT', response.data.next)
      commit('SET_POSTS', response.data)
    })
  },
  likePost({ commit }, params) {
    return PostService.likePost(params).then((response) => {
      commit('ADD_LIKE', response.data)
    })
  },
  commentPost({ commit }, params) {
    return PostService.commentPost(params).then((response) => {
      commit('ADD_COMMENT', response.data)
    })
  }
}
