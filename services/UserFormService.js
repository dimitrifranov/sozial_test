import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://127.0.0.1:8000/`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data'
  }
})

export default {
  updateUser(pk, params) {
    return apiClient.put('/users/' + pk + '/', params)
  }
}
