import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:8000/`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data'
  }
})

export default {
  postPost(group, params) {
    return apiClient.post('/groups/' + group + '/posts/', params)
  }
}
