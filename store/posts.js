export const state = () => ({
  posts: [],
  next: null,
  start: true,
  gotposts: false
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
      // const post = state.posts.find((obj) => obj.id === data.post)
      // const likes = post.likes.filter((obj) => {
      //   return obj.id !== data.like
      // })
    }
  },
  GOT_POSTS(state) {
    state.gotposts = true
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
    if (state.next)
      return this.$axios.get(state.next).then((response) => {
        commit('SET_NEXT', response.data.next)
        commit('SET_POSTS', response.data)
        commit('GOT_POSTS')
      })
    else if (data.user) {
      return this.$axios
        .get('/groups/' + data.group + '/posts/?ordering=-pub_date', {
          params: { user: data.user }
        })
        .then((response) => {
          commit('SET_NEXT', response.data.next)
          commit('SET_POSTS', response.data)
          commit('GOT_POSTS')
        })
    } else {
      return this.$axios
        .get('groups/' + data.group + '/posts/?ordering=-pub_date')
        .then((response) => {
          commit('SET_NEXT', response.data.next)
          commit('SET_POSTS', response.data)
          commit('GOT_POSTS')
        })
    }
  },
  fetchFeed({ commit, state }, user) {
    commit('SET_START', false)
    if (state.next)
      return this.$axios.get(state.next).then((response) => {
        commit('SET_NEXT', response.data.next)
        commit('SET_POSTS', response.data)
        commit('GOT_POSTS')
      })
    else
      return this.$axios
        .get('feed/?ordering=-pub_date', { params: { user } })
        .then((response) => {
          commit('SET_NEXT', response.data.next)
          commit('SET_POSTS', response.data)
          commit('GOT_POSTS')
        })
  },
  publicPosts({ commit, state }) {
    commit('SET_START', false)
    if (state.next)
      return this.$axios.get(state.next).then((response) => {
        commit('SET_NEXT', response.data.next)
        commit('SET_POSTS', response.data)
        commit('GOT_POSTS')
      })
    else
      return this.$axios
        .get('public_posts/?ordering=-pub_date')
        .then((response) => {
          commit('SET_NEXT', response.data.next)
          commit('SET_POSTS', response.data)
          commit('GOT_POSTS')
        })
  },
  likePost({ commit }, params) {
    return this.$axios
      .post(
        '/groups/' + params.group + '/posts/' + params.post + '/likes/',
        params.data
      )
      .then((response) => {
        commit('ADD_LIKE', response.data)
      })
  },
  unlikePost({ commit, state }, params) {
    return this.$axios
      .delete(
        '/groups/' +
          params.group +
          '/posts/' +
          params.post +
          '/likes/' +
          params.like +
          '/'
      )
      .then(() => {
        commit('DEL_LIKE', params)
      })
  },
  commentPost({ commit }, params) {
    return this.$axios
      .post(
        '/groups/' + params.group + '/posts/' + params.post + '/comments/',
        params.data
      )
      .then((response) => {
        commit('ADD_COMMENT', response.data)
      })
  },
  deletePost({ commit }, params) {
    return this.$axios
      .delete('/groups/' + params.group + '/posts/' + params.post + '/')
      .then(() => {
        commit('DEL_POST', params.post)
      })
  },

  postPost({ commit }, params) {
    const apiClient = this.$axios.create({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
    return apiClient
      .post('/groups/' + params.group + '/posts/', params.data)
      .then((response) => {
        commit('ADD_POST', response.data)
      })
  }
}
