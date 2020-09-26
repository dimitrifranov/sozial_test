import axios from 'axios'
const apiClient = axios.create({
  baseURL: 'https://api.tschau.app',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getUsers() {
    return apiClient.get('/users/')
  },
  getUser(id) {
    return apiClient.get('/users/' + id + '/')
  },
  registerUser(data) {
    return apiClient.post('/users/', data)
  },
  updateUser(data) {
    return apiClient.put('/users/' + data.pk + '/', data)
  },
  getNotifications(data) {
    // console.log(data)
    return apiClient.get('/notifications/?ordering=-time', {
      params: { data }
    })
  },
  followUser(data) {
    return apiClient.post('/follow/', data)
  },
  unfollowUser(id) {
    return apiClient.delete('/follow/' + id + '/')
  },
  getPosts(id, next) {
    if (next) return apiClient.get(next)
    else return apiClient.get('/users/' + id + '/posts/')
  }
}
