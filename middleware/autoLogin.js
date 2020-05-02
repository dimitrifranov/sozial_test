export default function({ store }) {
  const userString = localStorage.getItem('user')
  const authString = localStorage.getItem('auth')
  if (userString && authString) {
    const userData = JSON.parse(userString)
    const authData = JSON.parse(authString)
    store.commit('SET_USER_DATA', userData)
    store.commit('SET_AUTH_DATA', authData)
  }
}
