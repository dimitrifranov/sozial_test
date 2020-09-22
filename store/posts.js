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
  DEL_POST(state, post) {
    const postObj = state.posts.find((obj) => obj.id === post)
    const index = state.posts.indexOf(postObj)
    if (index === 0) state.posts.shift()
    else state.posts = state.posts.splice(index - 1, 1)
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
    if (state.posts.length) {
      const post = state.posts.find((obj) => obj.id === response.post)
      post.likes.push(response)
    }
  },
  ADD_COMMENT(state, response) {
    const post = state.posts.find((obj) => obj.id === response.post)
    post.comments.push(response)
  },
  DEL_LIKE(state, data) {
    if (state.posts.length) {
      const post = state.posts.find((obj) => obj.id === data.post)
      const likes = post.likes.filter((obj) => {
        return obj.id !== data.like
      })
      console.log(likes.length)
    }
  }
}
export const actions = {
  deletePosts({ commit }) {
    commit('SET_START', true)
    commit('SET_NEXT', null)
    commit('DEL_POSTS')
  },
  fetchPosts({ commit, state }, data) {
    commit('SET_START', false)
    return PostService.getPosts(data.group, data.user, state.next).then(
      (response) => {
        commit('SET_NEXT', response.data.next)
        commit('SET_POSTS', response.data)
      }
    )
  },
  fetchFeed({ commit, state }, user) {
    commit('SET_START', false)
    return PostService.getFeed(user, state.next).then((response) => {
      commit('SET_NEXT', response.data.next)
      commit('SET_POSTS', response.data)
    })
  },
  publicPosts({ commit, state }) {
    commit('SET_START', false)
    return PostService.publicPosts(state.next).then((response) => {
      commit('SET_NEXT', response.data.next)
      commit('SET_POSTS', response.data)
    })
  },
  likePost({ commit }, params) {
    return PostService.likePost(params).then((response) => {
      commit('ADD_LIKE', response.data)
    })
  },
  unlikePost({ commit, state }, params) {
    return PostService.unlikePost(params.group, params.post, params.like).then(
      () => {
        commit('DEL_LIKE', params)
      }
    )
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
  },
  deletePost({ commit }, params) {
    return PostService.deletePost(params).then(() => {
      commit('DEL_POST', params.post)
    })
  }
}
