import axios from 'axios'
const qs = require('qs')

const apiClient = axios.create({
  baseURL: `http://localhost:8000/`,
  method: 'post',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default {
  loginUser(username, password) {
    return apiClient.post(
      '/o/token/',
      qs.stringify({
        grant_type: 'password',
        username,
        password,
        client_id: 'M8SZA3wfexupp7yVFJAWtq85QF76xCCAn0Pnp61f',
        client_secret:
          '6kFqBSGIMRaBRVZovwRKxw0dk9QLUbScwGiHgdcRmCNHMGVoUQzW678kAVXwBCeqHlh4fz3FRYjAUt9ewU0mseJv2mHVJz0I17HVVeQSD3pLTnrDJHC7KXMRHVp2ypkd'
      })
    )
  }
}
