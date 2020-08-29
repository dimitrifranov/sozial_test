import PostService from '@/services/PostService.js'
import postingService from '@/services/postingService.js'
export const state = () => ({
  posts: [],
  next: null,
  start: true
})
export const mutations = {
  SET_POSTS(state, response) {
    state.posts.push(...response.results)
  },
  DEL_POSTS(state) {
    state.posts = []
  },
  ADD_POST(state, post) {
    state.posts.unshift(post)
  },
  SET_NEXT(state, next) {
    state.next = next
  },
  SET_START(state, start) {
    state.start = start
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
  deletePosts({ commit, state }, group) {
    commit('SET_START', true)
    commit('SET_NEXT', null)
    commit('DEL_POSTS')
  },
  fetchPosts({ commit, state }, group) {
    commit('SET_START', false)
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
  },
  postPost({ commit }, params) {
    return postingService
      .postPost(params.group, params.data)
      .then((response) => {
        commit('ADD_POST', response.data)
      })
  }
}
