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
  getPosts(data, next) {
    if (next) return apiClient.get(next)
    else
      return apiClient.get(
        '/groups/' + data.group + '/posts/?search=' + data.text
      )
  }
}
