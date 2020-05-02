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
  getGroups() {
    return apiClient.get('/groups')
  },
  getGroup(id) {
    return apiClient.get('/group/' + id)
  },
  registerUser(credentials) {
    return apiClient.post('/users/', credentials)
  }
}
