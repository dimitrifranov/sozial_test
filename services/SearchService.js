import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://social-tests-api.herokuapp.com',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getUsers(data, next) {
    if (next) return apiClient.get(next)
    else return apiClient.get('/users/?search=' + data.text)
  },
  getGroups(data, next) {
    if (next) return apiClient.get(next)
    else return apiClient.get('/groups/?search=' + data.text)
  }
}
