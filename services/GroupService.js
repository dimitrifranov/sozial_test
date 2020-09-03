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
  getGroups() {
    return apiClient.get('/groups/')
  },
  getGroup(id) {
    return apiClient.get('/group/' + id)
  },
  registerUser(credentials) {
    return apiClient.post('/users/', credentials)
  },
  joinGroup(data) {
    return apiClient.post('/memberships/', data)
  },
  leaveGroup(id) {
    return apiClient.delete('/memberships/' + id + '/')
  }
}
