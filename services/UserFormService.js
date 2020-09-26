import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.tschau.app',
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
