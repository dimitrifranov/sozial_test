import axios from 'axios'

const apiClient = axios.create({
  baseURL: `https://social-tests-api.herokuapp.com/`,
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
