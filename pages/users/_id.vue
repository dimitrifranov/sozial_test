<template>
  <div>
    <profile :user="user" :posts="posts" />
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import profile from '@/components/profile.vue'
export default {
  components: {
    profile
  },
  asyncData({ $axios, route, error }) {
    const userRequest = $axios({
      url:
        'https://social-tests-api.herokuapp.com/users/' + route.params.id + '/',
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const userPostsRequest = $axios({
      url:
        'https://social-tests-api.herokuapp.com/users/' +
        route.params.id +
        '/posts/',
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    return Promise.all([userRequest, userPostsRequest])
      .then((results) => {
        return {
          user: results[0].data,
          posts: results[1].data.results
        }
      })

      .catch((e) => {
        error({
          statusCode: 503,
          message: 'Unable to get this Users'
        })
      })
  },
  head() {
    return {
      title: this.user.username,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Das Profil von ' + this.user.username
        }
      ]
    }
  }
  // computed: {
  //   ...mapState({
  //     user: (state) => state.users.user
  //   })
  // }
}
</script>

<style scoped></style>
