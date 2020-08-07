import axios from 'axios'

const apiClient = axios.create({
  baseURL: `https://social-tests-api.herokuapp.com/`,
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
    return apiClient.get('/notifications/', { params: { data } })
  },
  followUser(data) {
    return apiClient.post('/follow/', data)
  }
}
