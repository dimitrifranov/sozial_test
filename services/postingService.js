import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://social-tests-api.herokuapp.com',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data'
  }
})

export default {
  postPost(group, params) {
    return apiClient.post('/groups/' + group + '/posts/', params)
  },
  postGroup(params) {
    return apiClient.post('/groups/', params)
  },
  updateGroup(id, params) {
    return apiClient.put('/groups/' + id + '/', params)
  }
}
