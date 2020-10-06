export default function(context) {
  context.$axios.onRequest((config) => {
    const token = context.$auth.$storage.getLocalStorage('_token.local')
    // console.log(token)
    // console.log(context)
    if (token && context.$auth.loggedIn) {
      config.headers.common.Authorization = token
      //   console.log(config.headers.common)
    }
  })
}
