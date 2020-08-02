import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:8000/`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getPosts(group, next) {
    if (next) return apiClient.get(next)
    else return apiClient.get('/groups/' + group + '/posts/')
  },
  getPost(group, post) {
    return apiClient.get('/groups/' + group + '/posts/' + post)
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
  commentPost(params) {
    return apiClient.post(
      '/groups/' + params.group + '/posts/' + params.post + '/comments/',
      params.data
    )
  }
}
