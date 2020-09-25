import axios from 'axios'
const apiClient = axios.create({
  baseURL: 'https://api.tschau.app/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getPosts(data) {
    if (data.next) return apiClient.get(data.next)
    else if (data.user) {
      return apiClient.get(
        '/groups/' + data.group + '/posts/?ordering=-pub_date',
        {
          params: { user: data.user }
        }
      )
    } else {
      return apiClient.get(
        '/groups/' + data.group + '/posts/?ordering=-pub_date'
      )
    }
  },
  getFeed(user, next) {
    if (next) return apiClient.get(next)
    else return apiClient.get('/feed/?ordering=-pub_date', { params: { user } })
  },
  publicPosts(next) {
    if (next) return apiClient.get(next)
    else return apiClient.get('/public_posts/?ordering=-pub_date')
  },
  getPost(data) {
    return apiClient.get('/groups/' + data.group + '/posts/' + data.post, {
      params: { user: data.user }
    })
  },
  postPost(group, params) {
    return apiClient.post('/groups/' + group + '/posts/', params)
  },
  likePost(params) {
    return apiClient.post(
      '/groups/' + params.group + '/posts/' + params.post + '/likes/',
      params.data
    )
  },
  unlikePost(group, post, like) {
    return apiClient.delete(
      '/groups/' + group + '/posts/' + post + '/likes/' + like + '/'
    )
  },
  commentPost(params) {
    return apiClient.post(
      '/groups/' + params.group + '/posts/' + params.post + '/comments/',
      params.data
    )
  },
  deleteComment(group, post, comment) {
    return apiClient.delete(
      '/groups/' + group + '/posts/' + post + '/comments/' + comment + '/'
    )
  },
  deletePost(params) {
    return apiClient.delete(
      '/groups/' + params.group + '/posts/' + params.post + '/'
    )
  }
}
